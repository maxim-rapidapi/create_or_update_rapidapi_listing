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
            console.error("Couldn't parse file: " + oas)
            process.exit(1)
        }
    } catch (err) {
        console.error('Could not read file: ' + oas)
        process.exit(1)
    }
}

module.exports = { read_spec }
