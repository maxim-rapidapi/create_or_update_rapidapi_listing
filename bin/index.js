#!/usr/bin/env node

require('dotenv').config()

const { needenv } = require('./needenv')
const { read_spec } = require('./read_spec')
const { already_exists } = require('./already_exists')
const { api_version_from_spec, api_name_from_spec, api_description_from_spec } = require('./parse_spec')
const { get_current_api_version } = require('./get_current_api_version')
const { graphql_headers, rest_headers } = require('./headers')
const { create_new_listing } = require('./create_new_listing')
const { create_api_version } = require('./create_api_version')
const { update_api_version } = require('./update_api_version')

const process = require('process')
const graphql = require('graphql-request')
const util = require('util')

async function main() {
    const spec_path = needenv('SPEC_PATH')
    const owner_id = needenv('OWNER_ID')

    const client = new graphql.GraphQLClient(process.env.GRAPHQL_URL, {
        headers: graphql_headers(),
    })

    const j = read_spec(spec_path)
    const name = api_name_from_spec(j)
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

    const new_api_id = await create_new_listing(spec_path)
    console.log('new api id: ' + new_api_id)
    // const new_version_id = create_api_version('0.4.4', new_api_id, client)
    // update_api_version(spec_path, new_version_id, client)
}

main().catch((error) => console.error(error))
