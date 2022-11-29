const return_graphql_object = {
    'content-type': 'application/json',
    'x-rapidapi-key': 'rapidapi_key',
    'x-rapidapi-host': 'rapidapi_graphql_host',
}

test('verify the correct creation of graphql header object', () => {
    process.env.X_RAPIDAPI_KEY = 'rapidapi_key'
    process.env.X_RAPIDAPI_GRAPHQL_HOST = 'rapidapi_graphql_host'
    const { graphql_headers } = require('../main/headers.js')
    expect(graphql_headers()).toEqual(return_graphql_object)
})
