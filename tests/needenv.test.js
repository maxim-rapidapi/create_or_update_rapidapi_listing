const { needenv } = require('../bin/needenv')

test('verify the existence of an environment variable ', () => {
    process.env.FOO = 'bar'
    expect(needenv('FOO')).toBe('bar')
})

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
test('verify the absence of an environment variable ', () => {
    delete process.env.FOO
    needenv('FOO')
    expect(mockExit).toHaveBeenCalledWith(1)
})
