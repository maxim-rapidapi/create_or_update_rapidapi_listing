const core = require('@actions/core')

function formGraphqlHeaders () {
  const xRapidapiKey = core.getInput('X_RAPIDAPI_KEY', { required: true })
  const xRapidapiGraphqlHost = core.getInput('X_RAPIDAPI_GRAPHQL_HOST', {
    required: true
  })

  return {
    'content-type': 'multipart/form-data',
    'x-rapidapi-key': xRapidapiKey,
    'x-rapidapi-host': xRapidapiGraphqlHost
  }
}

function graphqlHeaders () {
  const xRapidapiKey = core.getInput('X_RAPIDAPI_KEY', { required: true })
  const xRapidapiGraphqlHost = core.getInput('X_RAPIDAPI_GRAPHQL_HOST', {
    required: true
  })

  return {
    'content-type': 'application/json',
    'x-rapidapi-key': xRapidapiKey,
    'x-rapidapi-host': xRapidapiGraphqlHost
  }
}

module.exports = { formGraphqlHeaders, graphqlHeaders }
