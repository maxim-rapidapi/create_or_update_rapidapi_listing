const { needenv } = require('../bin/needenv')

function plain_graphql_headers() {
    let x_rapidapi_key = needenv('X_RAPIDAPI_KEY')
    let x_rapidapi_identity_key = needenv('X_RAPIDAPI_IDENTITY_KEY')
    let x_rapidapi_graphql_host = needenv('X_RAPIDAPI_GRAPHQL_HOST')

    return {
        'x-rapidapi-key': x_rapidapi_key,
        'x-rapidapi-identity-key': x_rapidapi_identity_key,
        'x-rapidapi-host': x_rapidapi_graphql_host,
    }
}

function graphql_headers() {
    let x_rapidapi_key = needenv('X_RAPIDAPI_KEY')
    let x_rapidapi_identity_key = needenv('X_RAPIDAPI_IDENTITY_KEY')
    let x_rapidapi_graphql_host = needenv('X_RAPIDAPI_GRAPHQL_HOST')

    return {
        'content-type': 'application/json',
        'x-rapidapi-key': x_rapidapi_key,
        'x-rapidapi-identity-key': x_rapidapi_identity_key,
        'x-rapidapi-host': x_rapidapi_graphql_host,
    }
}

function rest_headers() {
    let x_rapidapi_key = needenv('X_RAPIDAPI_KEY')
    let x_rapidapi_rest_host = needenv('X_RAPIDAPI_REST_HOST')

    return {
        'x-rapidapi-key': x_rapidapi_key,
        'x-rapidapi-host': x_rapidapi_rest_host,
    }
}

module.exports = { plain_graphql_headers, graphql_headers, rest_headers }
