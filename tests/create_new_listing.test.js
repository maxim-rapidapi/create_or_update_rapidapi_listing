const { createNewListing } = require('../main/create_new_listing.js')
const nock = require('nock')
const fs = require('fs')

const contents = JSON.stringify({
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://my_gateway.com'
    }
  ]
})

const res = 'testId'

test('handling create_new_listing reponse', async () => {
  const mockRead = jest
    .spyOn(fs, 'readFileSync')
    .mockImplementation((filename) => contents)
  nock('https://platform-graphql.p.rapidapi.com')
    .post('/')
    .reply(200, {
      data: {
        createApisFromRapidOas: [
          {
            apiId: 'testId',
            trackingId: 'testTrackingId',
            warnings: []
          }
        ]
      }
    })
  expect(await createNewListing('/home/someuser/test_spec.json')).toEqual(
    res
  )
  mockRead.mockRestore()
})
