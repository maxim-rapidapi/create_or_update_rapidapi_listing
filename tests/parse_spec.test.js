const {
    api_version_from_spec,
    api_name_from_spec,
    api_description_from_spec,
} = require('../bin/parse_spec')

test('return the version of a spec file correctly', () => {
    expect(api_version_from_spec(JSON.parse(my_spec))).toBe('1.0.1')
})

test('return the name of an API correctly from an OAS', () => {
    expect(api_name_from_spec(JSON.parse(my_spec))).toBe('My API Name')
})

test('return the description of an API correctly from an OAS', () => {
    expect(api_description_from_spec(JSON.parse(my_spec))).toBe(
        "The API's description"
    )
})

const my_spec = `{
  "openapi": "3.0.0",
  "servers": [
    {
      "url": "https://gateway.example.com"
    }
  ],
  "tags": [
    {
      "name": "v1",
      "description": "The project wiki",
      "externalDocs": {
        "url": "https://github.com/example/email_validator/wiki",
        "description": "Project wiki"
      }
    }
  ],
  "paths": {
    "/v1/validate": {
      "post": {
        "tags": [
          "v1"
        ],
        "summary": "Validate the email address",
        "externalDocs": {
          "url": "https://github.com/example/email_validator/wiki",
          "description": "Endpoint wiki"
        },
        "operationId": "/v1/validate",
        "description": "Will provide information syntax validity",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "examples": {
                  "Example response": {
                    "value": {
                      "address": "programmer@example.com",
                      "domain": "example.com",
                      "is_valid_syntax": true,
                      "username": "maxim"
                    },
                    "summary": "Example response",
                    "description": "Example response description"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "address": {
                      "type": "string"
                    },
                    "domain": {
                      "type": "string"
                    },
                    "is_valid_syntax": {
                      "type": "boolean"
                    },
                    "username": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "description": ""
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "examples": {
                "An example response": {
                  "value": {
                    "address": "programmer@example.com"
                  },
                  "summary": "An example response",
                  "description": "Description of the example request"
                }
              },
              "schema": {
                "type": "object",
                "properties": {
                  "address": {
                    "type": "string"
                  }
                },
                "externalDocs": {
                  "url": "https://github.com/example/email_validator/wiki",
                  "description": "Body external docs"
                }
              }
            }
          },
          "description": ""
        }
      }
    }
  },
  "info": {
    "title": "My API Name",
    "version": "1.0.1",
    "description": "The API's description",
    "x-category": "My API category",
    "x-long-description": "readme bla bla bla",
    "x-website": "https://www.example.com",
    "x-public": true,
    "x-thumbnail": "https://url.to.image/image.png",
    "x-version-lifecycle": "active",
    "x-badges": [
      {
        "name": "region",
        "value": "global"
      },
      {
        "name": "security",
        "value": "low"
      },
      {
        "name": "env",
        "value": "test"
      }
    ],
    "termsOfService": "https:///www.example.com/tos",
    "x-collections": [
      "Most popular APIs"
    ]
  },
  "x-gateways": [
    {
      "url": "gateway.example.com"
    }
  ],
  "x-documentation": {
    "readme": "These are the docs",
    "tutorials": [],
    "spotlights": []
  }
}`
