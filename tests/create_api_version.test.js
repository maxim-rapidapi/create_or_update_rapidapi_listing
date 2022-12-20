const { createApiVersion } = require('../main/create_api_version')
const nock = require('nock')
const graphql = require('graphql-request')

afterEach(() => {
  jest.restoreAllMocks()
})

const res = {
  data: {
    createApiVersions: [
      {
        id: 'the_id_we_are_looking_for'
      }
    ]
  }
}

test('handling update_api_version reponse', async () => {
  const c = new graphql.GraphQLClient(
    'https://platform-graphql.p.rapidapi.com'
  )
  nock('https://platform-graphql.p.rapidapi.com').post('/').reply(200, res)
  expect(await createApiVersion('1.0.0', 'api_id', c)).toEqual(
    'the_id_we_are_looking_for'
  )
})
