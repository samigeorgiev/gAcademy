# Resource management control microservice

## Requirements

- node:13
- yarn:latest
- docker:latest *Optional*

## Configuring

You should provide `.env` file with proper extension for Node environment with these variables:

- NODE_ENV
- PORT
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_SYNCHRONIZE
- JWT_SECRET
- JWT_VALID_TIME

## Running

Generate proto files:

`$ ./genproto.sh`

Install dependencies:

`$ yarn install`

Start in development mode:

`$ yarn dev`

Start in production-local mode:

`$ yarn start-local`

**Note:** Use `yarn start` only in container environment

## Linting

All `.js` files should be linted with `eslint`. Config file is `.eslintrc.json`.
To lint all files run `yarn lint`

For avoiding linting errors you could use [*prettier*](http://prettier.io) with `.prettierrc.json` as configuration.
