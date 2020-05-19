# gAcademy

![Continuos Integration](https://github.com/samigeorgiev/gAcademy/workflows/Continuos%20Integration/badge.svg)

An innovative system for online courses and private lessons.
More info [here](https://docs.google.com/document/d/1fkdSdzDGGP2k6GoWZbLf5tiuc6XammQNQSOXZIz-FHo/edit?usp=sharing).

## Running

### Requirements

- [docker:latest](https://docs.docker.com/install)
- [docker-compose:latest](https://docs.docker.com/compose/install)
- [node:13](https://nodejs.org/en/download)
- [yarn:latest](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- [protobuf:latest](https://github.com/protocolbuffers/protobuf/releases)
- [protoc-gen-grpc-web:latest](https://github.com/grpc/grpc-web/releases)

### Starting

#### Microservices

To run all microservices you should provide these environment variables:

- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_SYNCHRONIZE
- NODE_ENV
- JWT_SECRET
- JWT_VALID_TIME
- PAYPAL_MODE
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET

The easiest way is with script:

`$ source set-env.sh`

**Note:**: Fastest way for preparing the environment(**except paypal integration**) is running `run-db-on-docker.sh` which creates the database with necessary tables and using `set-env.sh.example` for environments variables.

After that you should compile all protocols files:

`$ ./genproto.sh`

Run all containers as well as the proxy server:

`$ docker-compose up`

#### SPA client

Before run it create `.env` with proper extension for node environment and add variables for services url in following format: `REACT_APP_${microservice_name}`
If you run all of the microservices and the client on the same host use `.env.example`.

In the `client/` folder run:

`$ ./genproto.sh`
`$ yarn install`
`$ yarn start`

## Development

### Testing gRPC

Recommended way to test your gRPC services is with [grpcui](https://github.com/fullstorydev/grpcui)

### Recommended IDE

Recommended IDE is [*Visual Studio Code*](https://code.visualstudio.com).
Example configuration could be found [here](https://gist.github.com/samigeorgiev/9ae961943212bc7872f46840519e308b).

**Note:** Some microservices could have their own recommendations.

### Git

#### Commit messages

- [Update] *description* - For adding and updating
- [Fix] *description* - For fixing bug
- [Remove] *description* - For removing

#### Branching strategy

Project uses [*GitFlow*](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as a branching strategy

### Process management system

Project uses Kanban and [*Kanbanize*](https://tues.kanbanize.com/ctrl_board/7/)
