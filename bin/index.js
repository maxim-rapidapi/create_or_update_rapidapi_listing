#!/usr/bin/env node

require('dotenv').config()

const { needenv } = require('./needenv')
const { read_spec } = require('./read_spec')
const { already_exists } = require('./already_exists')
const { api_version_from_spec, api_name_from_spec, api_description_from_spec } = require('./parse_spec')
const { get_current_api_version } = require('./get_current_api_version')
const { graphql_headers, rest_headers } = require('./headers')

const process = require('process')
const graphql = require('graphql-request')
const util = require('util')

function create_new_listing(spec_path) {
    // tbd
}

function create_api_version() {
    // tbd
}

function update_api_version() {
    // tbd
}

async function main() {
    const name = 'Email address verification'
    const spec_path = needenv('SPEC_PATH')
    const owner_id = needenv('OWNER_ID')

    const client = new graphql.GraphQLClient(process.env.GRAPHQL_URL, {
        headers: graphql_headers()
    })

    const j = read_spec(spec_path)
    const api_id = await already_exists(name, owner_id, client)
    if (api_id != null) {
        console.log('The API is: ' + api_id)
        const current_api_version = await get_current_api_version(api_id, client)
        console.log('Returned version id: ' + current_api_version.id)
        console.log('Returned version name: ' + current_api_version.name)
    } else {
        console.log('This is a new API')
    }

    console.log('Spec version: ' + api_version_from_spec(j))
}

main().catch((error) => console.error(error))
