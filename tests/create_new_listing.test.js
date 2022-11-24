const { create_new_listing } = require('../bin/create_new_listing')
const nock = require('nock')
const fs = require('fs')

const contents = JSON.stringify({
    openapi: '3.0.0',
    servers: [
        {
            url: 'https://my_gateway.com',
        },
    ],
})

const res = {
    apiId: 'testId',
    apiVersionId: 'testVersionId',
}

test('handling create_new_listing reponse', async () => {
    const mockRead = jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation((filename) => contents)
    nock('https://platform-rest.p.rapidapi.com')
        .post('/v1/apis/rapidapi-file')
        .reply(201, {
            apiId: 'testId',
            apiVersionId: 'testVersionId',
        })
    expect(await create_new_listing('/home/someuser/test_spec.json')).toEqual(
        res
    )
    mockRead.mockRestore()
})

test('error handling of 404 reponse', async () => {
    const mockRead = jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation((filename) => contents)
    nock('https://platform-rest.p.rapidapi.com')
        .post('/v1/apis/rapidapi-file')
        .reply(404)
    await expect(
        create_new_listing('/home/someuser/test_spec.json')
    ).rejects.toThrow(
        'Platform API error: AxiosError: Request failed with status code 404'
    )
    mockRead.mockRestore()
})

test('error handling of non-201 reponse', async () => {
    const mockRead = jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation((filename) => contents)
    nock('https://platform-rest.p.rapidapi.com')
        .post('/v1/apis/rapidapi-file')
        .reply(200)
    await expect(
        create_new_listing('/home/someuser/test_spec.json')
    ).rejects.toThrow('HTTP status is not 201, but 200')
    mockRead.mockRestore()
})
