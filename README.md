# gAcademy
An innovative system for online courses and private lessons.  
More info [here](https://drive.google.com/file/d/1CLuLhElY9Lvn_G-qVlMkA_7X-UUZwe8h/view?usp=sharing).

## Running

### Requirements
- [docker:latest](https://docs.docker.com/install)
- [docker-compose:latest](https://docs.docker.com/compose/install)
- [node:13](https://nodejs.org/en/download)
- [yarn:latest](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

### Starting

#### Microservices
To run all microservices you should provide these environment variables:
- DB_TYPE
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_JDBC_URL
- DB_DATABASE
- DB_LOGGING
- DB_SYNCHRONIZE
- JWT_SECRET
- JWT_VALID_TIME
- NODE_ENV
- LOG_LEVEL

The recommended way for linux is export them with script. You could also use `set-env.sh.example` with preset values. Then run:

`
$ source set-env.sh
`

After that you should compile all protocols files:

`
$ ./genproto.sh
`

Run all containers as well as the proxy server:

`
$ docker-compose up
`

#### SPA client

Before run it create `.env` with proper extension for node environment and add variables for services url in following format: `REACT_APP_${microservice_name}`
If you run all of the microservices and the client on the same host use `.env.example`.

In the `client/` folder run:

`
$ ./genproto.sh
`  
`
$ yarn install
`  
`
$ yarn start
`

## Contributing

### Microservices

Every microservices should have its own README with information about contribution. New microservices should be using gRPC framework and should be containerized.

### Testing gRPC

Recommended way to test your gRPC services is with [grpcui](https://github.com/fullstorydev/grpcui)

### SPA client

See [client](client/README.md).

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
