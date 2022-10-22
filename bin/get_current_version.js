/**
 * Select the version set as current from a list of api_versions
 * @param {array} versions List of version objects
 * @return {object} An object containing the name and id of the latest version of this API
 */
function get_current_version(versions) {
    const current = versions.find(element => element.current == true)
    // console.log("Current version id: " + current.id)
    return {
        name: current.name, 
        id: current.id
    }
}

module.exports = { get_current_version }