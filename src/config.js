export default {
  bindTo: 'auth',
  localEnv: true,
  errors: {
    authorizer: { code: 401, message: 'Authorizer not present' },
    claims: { code: 401, message: 'Missing authorizer claims' }
  }
}