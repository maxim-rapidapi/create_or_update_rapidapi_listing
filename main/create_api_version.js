const graphql = require('graphql-request')
const { UnexpectedResponseError } = require('./errors')

/**
 * Creates and returns a new API version for a given API
 * @param {*} version_name Version name or number for the new API version
 * @param {*} api_id The id of the API to create a new version for
 * @param {object} client The GraphQL Client object for reuse
 * @returns {string} The id of the newly created API version
 */
async function createApiVersion (name, api, client) {
  const mutation = graphql.gql`
    mutation createApiVersions($apiVersions: [ApiVersionCreateInput!]!) {
        createApiVersions(apiVersions: $apiVersions) {
            id
        }
    }`

  const params = {
    apiVersions: {
      api,
      name
    }
  }

  try {
    const res = await client.request(mutation, params)
    if (res.errors !== undefined) {
      throw new UnexpectedResponseError(
                `Unable to create new API version: ${res.errors[0].message}`
      )
    } else {
      return res.createApiVersions[0].id
    }
  } catch (err) {
    console.log(err)
    throw new Error('Unknown error in create_api_version')
  }
}

module.exports = { createApiVersion }
