/**
 * Select the version set as current from a list of api_versions <br/>
 * There should always be a single API version set as current, so this function always
 * returns a single object containing the name and id of the API version set as current.
 * @param {array} versions List of version objects
 * @return {object} An object containing the name and id of the latest version of this API
 */
function get_current_version(versions) {
    console.log('entering get_current_version')
    const current = versions.find((element) => element.current == true)
    console.log('almost leaving get_current_version')
    return {
        name: current.name,
        id: current.id,
    }
}

module.exports = { get_current_version }
