const core = require('@actions/core')

function form_graphql_headers() {
    let x_rapidapi_key = core.getInput('X_RAPIDAPI_KEY', { required: true })
    let x_rapidapi_identity_key = core.getInput('X_RAPIDAPI_IDENTITY_KEY', {
        required: true,
    })
    let x_rapidapi_graphql_host = core.getInput('X_RAPIDAPI_GRAPHQL_HOST', {
        required: true,
    })

    return {
        'content-type': 'multipart/form-data',
        'x-rapidapi-key': x_rapidapi_key,
        'x-rapidapi-identity-key': x_rapidapi_identity_key,
        'x-rapidapi-host': x_rapidapi_graphql_host,
    }
}

function graphql_headers() {
    let x_rapidapi_key = core.getInput('X_RAPIDAPI_KEY', { required: true })
    let x_rapidapi_identity_key = core.getInput('X_RAPIDAPI_IDENTITY_KEY', {
        required: false,
    })
    let x_rapidapi_graphql_host = core.getInput('X_RAPIDAPI_GRAPHQL_HOST', {
        required: true,
    })

    return {
        'content-type': 'application/json',
        'x-rapidapi-key': x_rapidapi_key,
        'x-rapidapi-identity-key': x_rapidapi_identity_key,
        'x-rapidapi-host': x_rapidapi_graphql_host,
    }
}

function rest_headers() {
    let x_rapidapi_key = core.getInput('X_RAPIDAPI_KEY', { required: true })
    let x_rapidapi_rest_host = core.getInput('X_RAPIDAPI_REST_HOST', {
        required: true,
    })

    return {
        'x-rapidapi-key': x_rapidapi_key,
        'x-rapidapi-host': x_rapidapi_rest_host,
    }
}

module.exports = { form_graphql_headers, graphql_headers, rest_headers }
