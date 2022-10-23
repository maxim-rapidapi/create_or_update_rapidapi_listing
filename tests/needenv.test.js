const { needenv } = require('../bin/needenv')

test('verify the existence of an environment variable ', () => {
    process.env.FOO = 'bar'
    expect(needenv('FOO')).toBe('bar')
})

test('verify the absence of an environment variable ', () => {
    delete process.env.FOO
    expect(() => {
        needenv('FOO')
    }).toThrow('Environment variable FOO is undefined.')
})
