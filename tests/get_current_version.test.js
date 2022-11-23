const { get_current_version } = require('../bin/get_current_version')

const version_list = [
    {
        id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-ba02c06fbddb',
        api: 'api_8ef57cc9-aca9-427d-b643-7d9eec7b5712',
        current: true,
        name: '0.4.3',
        status: 'ACTIVE',
        versionStatus: 'active',
    },
    {
        id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzzzzz',
        api: 'api_8ef57cc9-aca9-427d-b643-7d9eec7b5712',
        current: false,
        name: '0.4.2',
        status: 'ACTIVE',
        versionStatus: 'active',
    },
]
const expected = {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-ba02c06fbddb',
    name: '0.4.3',
}
test('gets the current version from a list of apiVersions', () => {
    expect(get_current_version(version_list)).toStrictEqual(expected)
})
