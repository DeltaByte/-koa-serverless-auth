import { lensPath, view } from 'ramda'
import config from './config'

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
  if (process.env.NODE_ENV === 'local') {
    Object.assign(ctx.state, { userId: '000000000', name: 'Example User' })
    await next()
    return
  }

  const authorizer = view(authorizerLens, ctx)
  if (!authorizer) ctx.throw(config.errors.authorizer.code, config.errors.authorizer.message)

  const claims = authorizer.claims
  if (!claims) ctx.throw(config.errors.claims.code, config.errors.claims.message)
  ctx.state[config.bindTo] = provider(authorizer)

  const scopes = authorizer.scopes
  if (scopes) ctx.state.scopes = scopes

  await next()
}

export default (overrideConfig) => {
  Object.assign(config, overrideConfig)
  return middleware
}
