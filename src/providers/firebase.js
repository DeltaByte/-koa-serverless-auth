export default (authorizer) => ({
  id: authorizer.claims.userId,
  name: authorizer.claims.name
})