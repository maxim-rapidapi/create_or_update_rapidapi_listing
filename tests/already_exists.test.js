const { alreadyExists } = require('../main/already_exists')
const graphql = require('graphql-request')

afterEach(() => {
  jest.restoreAllMocks()
})

const returnDataOne = `{
    "apis": {
        "nodes": [
            {
                "id": "the_id_we_are_looking_for"
            }
        ]
    }
}`

const returnIdOne = 'the_id_we_are_looking_for'

test('test graphql papi already_exists query contents', async () => {
  const c = new graphql.GraphQLClient()
  jest
    .spyOn(c, 'request')
    .mockImplementation((query, variables) => JSON.parse(returnDataOne))
  const res = await alreadyExists('My API', 'my_user_id', c)
  expect(res).toEqual(returnIdOne)
})

const result = [
  [
    '\n    query api($where: ApiWhereInput) {\n        apis(where: $where) {\n          nodes {\n            id\n            name\n          }\n        }\n      }',
    { where: { name: 'My API', ownerId: 'my_user_id' } }
  ]
]

test('test graphql papi query formatting', async () => {
  const c = new graphql.GraphQLClient()
  const mockClient = jest
    .spyOn(c, 'request')
    .mockImplementation((query, variables) => JSON.parse(returnDataOne))
  await alreadyExists('My API', 'my_user_id', c)
  expect(mockClient.mock.calls).toEqual(result)
})
