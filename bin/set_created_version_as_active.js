const graphql = require('graphql-request')

/**
 * Set the newly created version of the API as the current one
 * @param {string} api_version_id
 * @param {object} client The GraphQL Client object for reuse
 */
async function set_created_version_as_active(api_version_id, client) {
    const mutation = graphql.gql`
        mutation updateApiVersions($apiVersions: [ApiVersionUpdateInput!]!) {
          updateApiVersions(apiVersions: $apiVersions) {
            id
            name
            current
          }
        }
    `

    const variables = {
        apiVersions: [
            {
                apiVersionId: api_version_id,
                current: True,
                versionStatus: 'active',
            },
        ],
    }

    await client.request(mutation, variables)
}

module.exports = { set_created_version_as_active }
