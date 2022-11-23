const return_graphql_object = {
    'content-type': 'application/json',
    'x-rapidapi-key': 'rapidapi_key',
    'x-rapidapi-identity-key': 'rapidapi_identity_key',
    'x-rapidapi-host': 'rapidapi_graphql_host',
}

const return_rest_object = {
    'x-rapidapi-key': 'rapidapi_key',
    'x-rapidapi-host': 'rapidapi_rest_host',
}

test('verify the correct creation of graphql header object', () => {
    process.env.X_RAPIDAPI_KEY = 'rapidapi_key'
    process.env.X_RAPIDAPI_IDENTITY_KEY = 'rapidapi_identity_key'
    process.env.X_RAPIDAPI_GRAPHQL_HOST = 'rapidapi_graphql_host'
    const { graphql_headers } = require('../bin/headers')
    expect(graphql_headers()).toEqual(return_graphql_object)
})

test('verify the correct creation of rest header object', () => {
    process.env.X_RAPIDAPI_KEY = 'rapidapi_key'
    process.env.X_RAPIDAPI_REST_HOST = 'rapidapi_rest_host'
    const { rest_headers } = require('../bin/headers')
    expect(rest_headers()).toEqual(return_rest_object)
})
