export default {
  bindTo: 'auth',
  localEnv: true,
  fakeUser: {
    userId: '000000000',
    name: 'Example User'
  },
  errors: {
    authorizer: { code: 401, message: 'Authorizer not present' },
    claims: { code: 401, message: 'Missing authorizer claims' }
  }
}
