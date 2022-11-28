const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const core = require('@actions/core')
const { PlatformAPIError, UnexpectedStatusError } = require('./errors')
const { form_graphql_headers } = require('./headers')

/**
 * Creates a new API listing on the RapidAPI (Enterprise) Hub
 *
 * @param {string} filename Filename of the OAS to be uploaded
 * @return {string} The id of the newly created API
 */
async function create_new_listing(spec_path) {
    const graphql_url = core.getInput('GRAPHQL_URL', { required: true })

    const query = `
    mutation createApisFromRapidOas($creations: [ApiCreateFromRapidOasInput!]!) {
        createApisFromRapidOas(creations: $creations) {
        apiId
        
        }
    }`

    const variables = {
        creations: {
            spec: null,
        },
    }

    let creations_file = fs.readFileSync(spec_path)

    let fd = new FormData()
    fd.append('operations', JSON.stringify({ query, variables }))
    fd.append('map', '{"0":["variables.creations.spec"]}')
    fd.append('0', creations_file, {
        filename: 'spec.json',
        contentType: 'application/json',
    })

    let options = {
        method: 'POST',
        url: graphql_url,
        headers: Object.assign(form_graphql_headers(), fd.getHeaders()),
        data: fd,
    }

    try {
        const res = await axios.request(options)
        console.log(res.data.createApisFromRapidOas[0])
        if (res.status == 200) {
            return res.data.apiId
        } else {
            throw new UnexpectedStatusError(
                `HTTP status is not 201, but ${res.status}`
            )
        }
    } catch (err) {
        throw new PlatformAPIError(`Platform API error: ${err}`)
    }
}

module.exports = { create_new_listing }
