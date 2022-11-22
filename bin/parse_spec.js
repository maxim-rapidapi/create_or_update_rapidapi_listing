const semverValid = require('semver/functions/valid')
const { SpecParsingError } = require('./errors')

/**
 * Return the version field of a spec file
 * @param {string} spec The contents of a spec file
 * @returns {string} The contents of the version field in the info block
 */
function api_version_from_spec(spec) {
    if (spec.info.version == undefined) {
        throw new SpecParsingError("No property 'version' in spec")
    } else {
        if (semverValid(spec.info.version)) {
            return spec.info.version
        } else {
            throw new SpecParsingError(`Not a valid version according to semver: ${spec.info.version}`)
        }
    }
}

/**
 * Return the name (title) field of a spec file
 * @param {string} spec The contents of a spec file
 * @returns {string} The contents of the title field in the info block
 */
function api_name_from_spec(spec) {
    if (spec.info.title == undefined) {
        throw new SpecParsingError("No property 'title' in spec")
    } else {
        return spec.info.title
    }
}

/**
 * Return the description field of a spec file
 * @param {string} spec The contents of a spec file
 * @returns {string} The contents of the description field in the info block
 */
function api_description_from_spec(spec) {
    if (spec.info.description == undefined) {
        throw new SpecParsingError("No property 'description' in spec")
    } else {
        return spec.info.description
    }
}

module.exports = { api_version_from_spec, api_name_from_spec, api_description_from_spec }
