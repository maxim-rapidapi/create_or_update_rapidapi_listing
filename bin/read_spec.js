const fs = require('fs').promises

/**
 * Return JSON string containing the contents of an OAS
 * @param {string} oas Path to OAS
 * @return {string} The contents of the OAS
 */
async function read_spec(oas) {
    // let spec
    try {
        let spec = await fs.readFile(oas)
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
