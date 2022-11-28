const {
    set_created_version_as_active,
} = require('../main/set_created_version_as_active')
const graphql = require('graphql-request')
const nock = require('nock')

const res = {
    data: {
        updateApiVersion: [
            {
                id: 'testVersionId',
            },
        ],
    },
}

test('handling set_created_version_as_active reponse', async () => {
    const c = new graphql.GraphQLClient(
        'https://platform-graphql.p.rapidapi.com'
    )
    nock('https://platform-graphql.p.rapidapi.com').post('/').reply(200, res)
    expect(
        await set_created_version_as_active('api_version_id', c)
    ).toBeUndefined()
})
