const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const core = require('@actions/core')
const { form_graphql_headers } = require('./headers')
const { SpecParsingError } = require('./errors')

/**
 * Creates and returns a new API version for a given API
 * @param {*} version_name Version name or number for the new API version
 * @param {*} api_id The id of the API to create a new version for
 * @param {object} client The GraphQL Client object for reuse
 * @returns {string} The id of the newly created API version
 */
async function update_api_version(spec_path, api_version_id) {
    const graphql_url = core.getInput('graphql_url', { required: true })
    const query = `
        mutation updateApisFromRapidOas($updates: [ApiUpdateFromRapidOasInput!]!) {
        updateApisFromRapidOas(updates: $updates) {
            apiId
        }
    }`

    const variables = {
        updates: {
            spec: null,
            apiVersionId: api_version_id,
        },
    }

    let updates_file = fs.readFileSync(spec_path)

    let fd = new FormData()
    fd.append('operations', JSON.stringify({ query, variables }))
    fd.append('map', '{"0":["variables.updates.spec"]}')
    fd.append('0', updates_file, {
        filename: 'spec.json',
        contentType: 'application/json',
    })

    let options = {
        method: 'POST',
        url: graphql_url,
        headers: Object.assign(form_graphql_headers(), fd.getHeaders()),
        data: fd,
    }

    let res = await axios.request(options)
    if (res.status == 200 && !res.data.errors) {
        return res.status
    } else if (
        res.status == 200 &&
        res.data.errors &&
        typeof res.data.errors == 'object'
    ) {
        // this happens when an unknown collection is part of the spec; we get a 200, but
        // also an unprocessable_entity error :/
        error_message = []
        res.data.errors.forEach((value) => error_message.push(value.message))
        throw new SpecParsingError(`Error parsing spec: ${error_message}`)
    } else {
        throw new UnexpectedStatusError(
            `HTTP status is not 200, but ${res.status}`
        )
    }
}

module.exports = { update_api_version }
