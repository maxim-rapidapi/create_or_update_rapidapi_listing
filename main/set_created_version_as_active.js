const graphql = require('graphql-request')
const { PlatformAPIError } = require('./errors')

/**
 * Set the newly created version of the API as the current one
 * @param {string} api_version_id
 * @param {object} client The GraphQL Client object for reuse
 */
async function setCreatedVersionAsActive (apiVersionId, client) {
  const mutation = graphql.gql`
        mutation updateApiVersions($apiVersions: [ApiVersionUpdateInput!]!) {
          updateApiVersions(apiVersions: $apiVersions) {
            id
          }
        }
    `

  const variables = {
    apiVersions: [
      {
        apiVersionId,
        current: true,
        versionStatus: 'active'
      }
    ]
  }

  try {
    await client.request(mutation, variables)
  } catch (err) {
    throw new PlatformAPIError(`Platform API error: ${err}`)
  }
}

module.exports = { setCreatedVersionAsActive }
