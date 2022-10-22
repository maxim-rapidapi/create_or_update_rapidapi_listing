const fs = require('fs')
const { read_spec } = require('../bin/read_spec')

const contents = JSON.stringify({
    openapi: '3.0.0',
    servers: [
        {
            url: 'https://my_gateway.com',
        },
    ],
})

test('read a spec file into memory', () => {
    const mockRead = jest.spyOn(fs, 'readFileSync').mockImplementation((filename) => contents)
    expect(read_spec('/home/someuser/test_spec.json')).toStrictEqual(JSON.parse(contents))
    mockRead.mockRestore()
})

test('fail to read a spec file into memory', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    read_spec('foo')
    expect(mockExit).toHaveBeenCalledWith(1)
})
