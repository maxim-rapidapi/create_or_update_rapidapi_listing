const graphql = require('graphql-request')
const fs = require('fs')

/**
 * Creates and returns a new API version for a given API
 * @param {*} version_name Version name or number for the new API version
 * @param {*} api_id The id of the API to create a new version for
 * @param {object} client The GraphQL Client object for reuse
 * @returns {string} The id of the newly created API version
 */
async function update_api_version(spec_path, api_version_id, client) {
    const mutation = graphql.gql`
    mutation updateApisFromSpecs($updates: [ApiUpdateFromSpecInput!]!) {
        updateApisFromSpecs(updates: $updates) {
            apiId
        }
    }`

    const updates = {
        updates: {
            spec: fs.createReadStream(spec_path, 'utf-8'),
            specType: "OPENAPI",
            apiVersionId: api_version_id,
        },
    }

    const data = await client.request(mutation, updates)
    console.log(data.ApiSpecImportResult)
    return data.ApiSpecImportResult
}

module.exports = { update_api_version }