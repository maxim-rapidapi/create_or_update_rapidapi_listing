const fs = require('fs')
const { readSpec } = require('../main/read_spec')

const contents = JSON.stringify({
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://my_gateway.com'
    }
  ]
})

test('read a spec file into memory', () => {
  const mockRead = jest
    .spyOn(fs, 'readFileSync')
    .mockImplementation((filename) => contents)
  expect(readSpec('/home/someuser/test_spec.json')).toStrictEqual(
    JSON.parse(contents)
  )
  mockRead.mockRestore()
})

test('fail to read a spec file into memory', () => {
  expect(() => {
    readSpec('foo')
  }).toThrow('Could not read file: foo')
})
