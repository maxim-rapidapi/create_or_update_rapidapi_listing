const { getCurrentApiVersion } = require('../main/get_current_api_version')
const graphql = require('graphql-request')

afterEach(() => {
  jest.restoreAllMocks()
})

const versionList = JSON.parse(`
{ 
    "apiVersions": {
        "nodes": [
            {
                "id": "apiversion_a6ee5ca5-3bca-47b0-95a6-ba02c06fbddb",
                "api": "api_8ef57cc9-aca9-427d-b643-7d9eec7b5712",
                "current": true,
                "name": "0.4.3",
                "status": "ACTIVE",
                "versionStatus": "active"
            },
            {
                "id": "apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzzzzz",
                "api": "api_8ef57cc9-aca9-427d-b643-7d9eec7b5712",
                "current": false,
                "name": "0.4.2",
                "status": "ACTIVE",
                "versionStatus": "active"
            }
        ]
    }
}`)

const result = [
  [
    '\n    query apiVersions($where: ApiVersionWhereInput) {\n        apiVersions(where: $where) {\n          nodes {\n            id\n            name\n            current\n          }\n        }\n      }',
    {
      where: {
        apiId: 'api_8ef57cc9-aca9-427d-b643-7d9eec7b5712',
        versionStatus: 'ACTIVE'
      }
    }
  ]
]

test('test formatting of graphql query for current version', async () => {
  const c = new graphql.GraphQLClient()
  const mockClient = jest
    .spyOn(c, 'request')
    .mockImplementation((query, variables) => versionList)
  await getCurrentApiVersion(
    'api_8ef57cc9-aca9-427d-b643-7d9eec7b5712',
    c
  )
  expect(mockClient.mock.calls).toEqual(result)
})
