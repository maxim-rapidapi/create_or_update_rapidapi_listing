const fs = require('fs')

/**
 * Return JSON string containing the contents of an OAS
 * @param {string} oas Path to OAS
 * @return {string} The contents of the OAS
 */
function read_spec(oas) {
    try {
        let spec = fs.readFileSync(oas)
        try {
            return JSON.parse(spec)
        } catch (err) {
            throw "Couldn't parse file: " + oas
        }
    } catch (err) {
        console.log(err)
        throw 'Could not read file: ' + oas
    }
}

module.exports = { read_spec }
