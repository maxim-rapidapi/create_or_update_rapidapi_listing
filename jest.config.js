module.exports = {
    setupFiles: [
        "<rootDir>/tests/dotenv-config.js"
    ],
    roots: ['<rootDir>'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/*.test.js'],
    silent: true,
    collectCoverageFrom: [
          "main/*.js",
          "!main/errors.js"
      ]
  }
