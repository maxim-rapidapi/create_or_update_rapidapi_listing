const { already_exists } = require('../bin/already_exists')
const graphql = require('graphql-request')

afterEach(() => {
    jest.restoreAllMocks()
})

const return_data_one = `{
    "apis": {
        "nodes": [
            {
                "id": "the_id_we_are_looking_for"
            }
        ]
    }
}`

const return_id_one = 'the_id_we_are_looking_for'

test('test graphql papi already_exists query contents', async () => {
    const c = new graphql.GraphQLClient()
    const mockClient = jest.spyOn(c, 'request').mockImplementation((query, variables) => JSON.parse(return_data_one))
    const res = await already_exists('My API', 12345678, c)
    expect(res).toEqual(return_id_one)
})

const result = [
    [
        '\n    query api($where: ApiWhereInput) {\n        apis(where: $where) {\n          nodes {\n            id\n            name\n          }\n        }\n      }',
        { where: { name: 'My API', ownerId: 12345678 } },
    ],
]

test('test graphql papi query formatting', async () => {
    const c = new graphql.GraphQLClient()
    const mockClient = jest.spyOn(c, 'request').mockImplementation((query, variables) => JSON.parse(return_data_one))
    const response = await already_exists('My API', 12345678, c)
    expect(mockClient.mock.calls).toEqual(result)
})
