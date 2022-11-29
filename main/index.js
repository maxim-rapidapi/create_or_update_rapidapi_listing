#!/usr/bin/env node

require('dotenv').config()

const { already_exists } = require('./already_exists')
const { api_version_from_spec, api_name_from_spec } = require('./parse_spec')
const { create_api_version } = require('./create_api_version')
const { create_new_listing } = require('./create_new_listing')
const { get_current_api_version } = require('./get_current_api_version')
const { graphql_headers } = require('./headers')
const { read_spec } = require('./read_spec')
const { update_api_version } = require('./update_api_version')

const core = require('@actions/core')
const graphql = require('graphql-request')
const semver = require('semver')

async function main() {
    const spec_path = core.getInput('SPEC_PATH', { required: true })
    const graphql_url = core.getInput('GRAPHQL_URL', { required: true })

    // We're making two to three API calls to the GraphQL PAPI with the same headers, so
    // let's re-use a single client object
    const client = new graphql.GraphQLClient(graphql_url, {
        headers: graphql_headers(),
    })

    const spec = read_spec(spec_path)
    const name = api_name_from_spec(spec)
    const api_id = await already_exists(name, client)
    if (api_id != null) {
        // Provide some data about the API
        const current_version = await get_current_api_version(api_id, client)
        const parsed_current_version = current_version.name
        const parsed_spec_version = api_version_from_spec(spec)
        console.log('=> This is an existing API')
        console.log('  The API id is:   ' + api_id)
        console.log('  Version on Hub:  ' + parsed_current_version)
        console.log('  Version in spec: ' + parsed_spec_version)

        // Only create a new API version if the provided spec's version is higher than
        // the version already on the Hub
        const spec_is_newer = semver.gt(
            parsed_spec_version,
            parsed_current_version
        )
        console.log('=> Uploaded spec is newer: ' + spec_is_newer)

        if (spec_is_newer) {
            console.log('   Creating new API version in Hub...')
            const new_version_id = await create_api_version(
                parsed_spec_version,
                api_id,
                client
            )
            console.log('   => New version id: ' + new_version_id)
            await update_api_version(spec_path, new_version_id)
            console.log('   Successfully uploaded new API version into the Hub!')

            // Set output variables for re-use in later actions, if need be
            core.setOutput('api_id', api_id)
            core.setOutput('api_version_name', parsed_spec_version)
            core.setOutput('api_version_id', new_version_id)
        } else {
            console.warn('   Spec version was not newer than version on Hub...')
            console.warn('   Not creating new version.')
        }
        core.setOutput('api_id', api_id)
    } else {
        const new_api = await create_new_listing(spec_path)
        const initial_version = await get_current_api_version(new_api, client)
        console.log('=> This is a new API')
        console.log('   New api id: ' + new_api)
        console.log('   Initial version id: ' + initial_version.id)
        
        // Set output variables for re-use in later actions, if need be
        core.setOutput('api_id', new_api)
        core.setOutput('api_version_name', initial_version.name)
        core.setOutput('api_version_id', initial_version.id)
    }
}

main().catch((error) => console.error(error))
