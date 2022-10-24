const { rest_headers } = require('./headers')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const util = require('util')

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
    data.append('file', fs.readFileSync(filename, 'utf-8'), path.basename(filename))

    let papi_headers = rest_headers()
    let form_headers = data.getHeaders()
    let full_headers = Object.assign(papi_headers, form_headers)

    const options = {
        method: 'POST',
        data: data,
    }

    const SendPostRequest = async () => {
        const res = await axios
            .post(url, data, { headers: full_headers })
            .catch((err) => {
                console.error(err)
            })
        return res.data.apiId
    }
    return SendPostRequest()
}

module.exports = { create_new_listing }
