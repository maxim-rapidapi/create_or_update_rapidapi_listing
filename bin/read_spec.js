const fs = require('fs')

/**
 * Return JSON string containing the contents of an OAS
 * @param {string} oas Path to OAS
 * @return {string} The contents of the OAS
 */
function read_spec(oas) {
    let spec
    try {
        spec = fs.readFileSync(oas, 'utf-8')
        try {
            return JSON.parse(spec)
        } catch (err) {
            throw "Couldn't parse file: " + oas
        }
    } catch (err) {
        throw 'Could not read file: ' + oas
    }
}

module.exports = { read_spec }
