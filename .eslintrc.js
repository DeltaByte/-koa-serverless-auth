module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['prettier']
}
