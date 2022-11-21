const { rest_headers } = require('./headers')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const util = require('util')
// const path = require('path')

/**
 * Creates a new API listing on the RapidAPI (Enterprise) Hub
 * This has to be based on the REST PAPI until the GraphQL PAPI parses
 * metadata
 * @param {string} filename Filename of the OAS to be uploaded
 * @return {string} The id of the newly created API
 */
async function create_new_listing(filename) {
    let base_url = process.env.REST_URL
    if (base_url == '' || base_url == null) {
        base_url = 'https://platform.p.rapidapi.com/'
    }

    let url = `${base_url}v1/apis/rapidapi-file`

    const data = new FormData()
    // The encoding parameter to createReadStream here seems to be mandatory!
    data.append('file', fs.createReadStream(filename, { encoding: 'utf8' }))

    let papi_headers = rest_headers()
    let form_headers = data.getHeaders()
    let full_headers = Object.assign(papi_headers, form_headers)

    const options = {
        method: 'POST',
        url: url,
        headers: full_headers,
        data: data,
    }

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data)
            return response.data['apiId']
        })
        .catch(function (error) {
            console.log(error.response.data)
            console.log(error.response.status)
        })
}

module.exports = { create_new_listing }
