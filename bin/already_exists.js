const graphql = require('graphql-request')

/**
 * Checks whether an API already exists<br>
 * Returns the id of the existing API if it already exists<br>
 * Returns null if not
 * @param {string} name Name of the API to check
 * @param {number} owner_id The id of the API owner
 * @param {object} client The GraphQL Client object for reuse
 * @return {string} The id of the existing API
 */
async function already_exists(name, owner_id, client) {
    console.log('entering already_exists')
    const query = graphql.gql`
    query api($where: ApiWhereInput) {
        apis(where: $where) {
          nodes {
            id
            name
          }
        }
      }`

    const variables = {
        where: {
            name: name,
            ownerId: owner_id,
        },
    }

    const data = await client.request(query, variables)
    if (data.apis.nodes.length == 0) {
        return null
    } else if (data.apis.nodes.length == 1) {
        return data.apis.nodes[0].id
    } else {
        throw `More than one API found with name ${name}; that shouldn't happen.`
    }
}

module.exports = { already_exists }
