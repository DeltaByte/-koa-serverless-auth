import { lensPath, view } from 'ramda'
import settings from './config'

/**
 * @constant {R.lensPath} authorizerLens
 */
const authorizerLens = lensPath(['req', 'requestContext', 'authorizer', 'jwt'])

/**
 * Extract auth from AWS request context
 *
 * @param {import('koa').Context} context
 * @param {import('koa').Next} next
 */
const middleware = async (ctx, next) => {
  if (settings.localEnv && process.env.NODE_ENV === 'local') {
    ctx.state[settings.bindTo] = settings.exampleUser
    await next()
    return
  }

  const authorizer = view(authorizerLens, ctx)
  if (!authorizer) ctx.throw(settings.errors.authorizer.code, settings.errors.authorizer.message)

  const claims = authorizer.claims
  if (!claims) ctx.throw(settings.errors.claims.code, settings.errors.claims.message)
  ctx.state[settings.bindTo] = provider(authorizer)

  const scopes = authorizer.scopes
  if (scopes) ctx.state.scopes = scopes

  await next()
}

export default (config) => {
  Object.assign(settings, config)
  return middleware
}
