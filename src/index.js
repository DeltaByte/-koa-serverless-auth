import { lensPath, view } from 'ramda'
import providers from './providers'
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
  // bind fake user if running locally
  if (settings.localEnv && process.env.NODE_ENV === 'local') {
    ctx.state[settings.bindTo] = settings.exampleUser
    await next()
    return
  }

  // get provider
  const provider = providers[settings.provider]

  // parse oauth from request
  const authorizer = view(authorizerLens, ctx)
  if (!authorizer) ctx.throw(settings.errors.authorizer.code, settings.errors.authorizer.message)

  // parse claims to user profile data
  const claims = authorizer.claims
  if (!claims) ctx.throw(settings.errors.claims.code, settings.errors.claims.message)
  ctx.state[settings.bindTo] = provider(authorizer)

  // copy scopes to auth
  const scopes = authorizer.scopes
  if (scopes) ctx.state[settings.bindTo].scopes = scopes

  await next()
}

export default (config) => {
  Object.assign(settings, config)
  return middleware
}
