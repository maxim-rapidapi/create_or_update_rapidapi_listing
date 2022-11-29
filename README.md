# Create or update an API listing on RapidAPI Hub

This is a preview release of a GitHub action designed to make it easy to onboard
new APIs onto RapidAPI Hub or Enterprise Hub, or create new versions of existing
APIs. It uses the RapidAPI Platform API to upload an OpenAPI spec file and
returns the ID of the new API, as well as the name and ID of the newly created
API version.

## Usage

The action needs an OpenAPI v3.0 spec file in JSON format to exist in the repo. The
name of this file (or path to it, if it is in a subdirectory), needs to be fed to
the action by setting the `spec_path` environment variable.

### Requirements

If you are a RapidAPI Enterprise Hub user, you need the preview of the GraphQL Platform
API enabled in your Hub. You will need credentials (the `x-rapidapi-key` and
`x-rapidapi-host` headers) of a user or team that is enabled to use this API, as well as
their owner ID.

### Example workflow

```yaml
name: My API Workflow
on: push
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@master
            - name: Upload OAS to RapidAPI Hub for processing
              uses: maxim-rapidapi/create_or_update_rapidapi_listing@v0
              with:
                  spec_path: openapi.json
                  graphql_url: https://platform-graphql.p.rapidapi.com/
                  x_rapidapi_key: a-very-long-api-key
                  x_rapidapi_graphql_host: platform-graphql.yourhub.rapidapi.com
```

### Inputs

| Input                     | Description                                                                                                                        | Required |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `spec_path`               | Path to the OpenAPI spec file in JSON format                                                                                       | True     |
| `owner_id`                | Id of the team / user owning the existing API, or team / user to own the new API | True |
| `x_rapidapi_key`          | API key for the user / the team that will own this API on the Hub                                                                  | True     |
| `x_rapidapi_graphql_host` | GraphQL platform API host for the user / the team that will own this API on the Hub (e.g. `graphql-platform.yourhub.rapidapi.com`) | True     |
| `graphql_url`             | The URL to the GraphQL Platform API, defaults to `https://graphql-platform.p.rapidapi.com/` (mind the slash!)                      | True     |

### Outputs

| Output             | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `api_id`           | The ID of the newly created or updated API on the RapidAPI Hub              |
| `api_version_name` | The name (e.g. v0.2.0) of the newly created API version on the RapidAPI Hub |
| `api_version_id`   | The ID of the newly created API version on the RapidAPI Hub                 |

### Using outputs

The outputs of this action (`api_id` and `api_version_id`) can be used as input
to subsequent actions:

```yaml
steps:
- uses: actions/checkout@master
- name: Upload OAS to RapidAPI Hub for processing
  id: rapidapi-upload
  uses: maxim-rapidapi/creat_or_update_rapidapi@v0
  with:
    spec_path: openapi.json
    [...]

- name: Check outputs
    run: |
    echo "New API ID - ${{ steps.rapidapi-upload.outputs.api_id }}"
    echo "New API Version ID - ${{ steps.rapidapi-upload.outputs.api_version_id }}"
```

### Limitations

-   You can only use this Action with APIs you own, either through personal or team credentials.
-   There is no support for `on-behalf-of` or `x-rapidapi-identity-key` yet.
