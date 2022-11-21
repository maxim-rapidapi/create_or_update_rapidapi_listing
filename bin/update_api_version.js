const axios = require('axios')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const { plain_graphql_headers } = require('./headers')
const core = require('@actions/core')

/**
 * Creates and returns a new API version for a given API
 * @param {*} version_name Version name or number for the new API version
 * @param {*} api_id The id of the API to create a new version for
 * @param {object} client The GraphQL Client object for reuse
 * @returns {string} The id of the newly created API version
 */
async function update_api_version(spec_path, api_version_id) {
    const graphql_url = core.getInput('GRAPHQL_URL', { required: true })
    const mutation = `
        mutation updateApisFromRapidOas($updates: [ApiUpdateFromRapidOasInput!]!) {
        updateApisFromRapidOas(updates: $updates) {
            apiId
        }
    }`

    const updates = {
        updates: {
            spec: null,
            apiVersionId: api_version_id,
        },
    }

    let fd = new FormData()
    fd.append('operations', JSON.stringify({ mutation, updates }))
    fd.append('map', '{"0": ["updates.updates.spec"]}')
    fd.append(0, fs.createReadStream(spec_path), {
        filename: path.basename(spec_path),
        contentType: 'application/json',
    })

    let res = await axios
        .post(graphql_url, fd, {
            headers: Object.assign(plain_graphql_headers(), fd.getHeaders()),
        })
        .catch((err) => {
            console.error(err)
        })
    console.log(res)
    return res
}

module.exports = { update_api_version }
