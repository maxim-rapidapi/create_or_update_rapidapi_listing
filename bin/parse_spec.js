/**
 * Return the version field of a spec file
 * @param {string} spec The contents of a spec file
 * @returns {string} The contents of the version field in the info block
 */
async function api_version_from_spec(spec) {
    return spec.info.version
}

/**
 * Return the name (title) field of a spec file
 * @param {string} spec The contents of a spec file
 * @returns {string} The contents of the title field in the info block
 */
async function api_name_from_spec(spec) {
    return spec.info.title
}

/**
 * Return the description field of a spec file
 * @param {string} spec The contents of a spec file
 * @returns {string} The contents of the description field in the info block
 */
async function api_description_from_spec(spec) {
    return spec.info.description
}

module.exports = { api_version_from_spec, api_name_from_spec, api_description_from_spec }
