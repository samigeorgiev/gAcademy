# Content-management microservice

## Requirements
- node:13
- yarn:latest

## Configuring
You should provide `.env` file with proper extension for Node environment with these variables:
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_SYNCHRONIZE

## Running
Move all proto files to the microservice directory:

`
$ ./genproto.sh
`

Install dependencies:

`
$ yarn install
`

Start in development mode:

`
$ yarn dev
`

## Linting
All `.js` files should be linted with `eslint`. Config file is `.eslintrc.json`.
To lint all files run `yarn lint`
