const fs = require('fs')

/**
 * Return JSON string containing the contents of an OAS
 * @param {string} oas Path to OAS
 * @return {string} The contents of the OAS
 */
function readSpec (oas) {
  try {
    const spec = fs.readFileSync(oas)
    try {
      return JSON.parse(spec)
    } catch (err) {
      throw new Error("Couldn't parse file: " + oas)
    }
  } catch (err) {
    console.log(err)
    throw new Error('Could not read file: ' + oas)
  }
}

module.exports = { readSpec }
