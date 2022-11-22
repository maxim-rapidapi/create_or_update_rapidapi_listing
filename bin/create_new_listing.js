const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs').promises
const util = require('util')
const { rest_headers } = require('./headers')
const { UnexpectedStatusError } = require('./errors')

/**
 * Creates a new API listing on the RapidAPI (Enterprise) Hub
 * This has to be based on the REST PAPI until the GraphQL PAPI parses
 * metadata
 * @param {string} filename Filename of the OAS to be uploaded
 * @return {string} The id of the newly created API
 */
async function create_new_listing(filename) {
    let base_url = process.env.INPUT_REST_URL
    if (base_url == '' || base_url == null) {
        base_url = 'https://platform.p.rapidapi.com/'
    }

    let url = `${base_url}v1/apis/rapidapi-file`

    const data = new FormData()
    let oas = await fs.readFile(filename, 'utf8')
    data.append('file', oas, { filename: 'spec.json', contentType: 'application/json' })

    let papi_headers = rest_headers()
    let form_headers = data.getHeaders()
    let full_headers = Object.assign(papi_headers, form_headers)

    const options = {
        method: 'POST',
        url: url,
        headers: full_headers,
        data: data,
    }

    const res = await axios.request(options)
    if (res.status == 201) {
        return {
            apiId: res.data.apiId,
            apiVersionId: res.data.apiVersionId,
        }
    } else {
        throw new UnexpectedStatusError(`HTTP status is not 201, but ${res.status}`)
    }
}

module.exports = { create_new_listing }
