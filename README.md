# Koa-serverless-auth

Koa middleware for adding auth state from API Gateway. This library assumes that the request has already been parsed via
another library, e.g. [serverless-http](https://www.npmjs.com/package/serverless-http).

Currently the only supported gateways are the AWS ones.

## Options

| Name             | Type    | Default                                         | Description                                                  |
| ---------------- | ------- | ----------------------------------------------- | ------------------------------------------------------------ |
| bindTo           | String  | `auth`                                          | Context state key to store the auth object against           |
| errors           | Object  |                                                 | Error messages                                               |
| errors.?.code    | Number  |                                                 | HTTP status code                                             |
| errors.?.message | String  |                                                 | Response message                                             |
| localEnv         | Boolean | `true`                                          | Apply fake user data if `NODE_ENV` is `local`                |
| fakeUser         | Object  | `{ userId: '000000000', name: 'Example User' }` | Fake auth object that will be applied if runing in local env |

### Errors

| Name       | Default Code | Default Message           | Description                                     |
| ---------- | ------------ | ------------------------- | ----------------------------------------------- |
| authorizer | 401          | Authorizer not present    | Authorizer keys were not present in the request |
| claims     | 401          | Missing authorizer claims | oAuth claims failed to parse                    |

## Authorizers

### Firebase

- Gateway: [HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
- Provider: [Firebase](https://firebase.google.com/docs/auth)

| Firebase key  | Koa key  | Type   | Description               |
| ------------- | -------- | ------ | ------------------------- |
| claims.userId | `id`     | String | Users identifier          |
| claims.name   | `name`   | String | Users name                |
| scopes        | `scopes` | Object | _(optional)_ oAuth scopes |
