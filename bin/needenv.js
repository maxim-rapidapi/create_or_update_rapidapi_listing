/**
 * Verify an environment variable exists and return it; exits program if not
 * @param {string} var_name name of the environment variable to be checked
 * @return {string} The environment variable
 */
function needenv(var_name) {
    const res = process.env[var_name]
    if (res != undefined) {
        return res
    } else {
        console.error('Environment variable ' + var_name + ' is undefined.')
        process.exit(1)
    }
}

module.exports = { needenv }
