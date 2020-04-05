# gAcademy
An innovative system for online courses and private lessons.  
More info [here](https://drive.google.com/file/d/1CLuLhElY9Lvn_G-qVlMkA_7X-UUZwe8h/view?usp=sharing)

## Running

### Requirements
- [docker:latest](https://docs.docker.com/install)
- [docker-compose:latest](https://docs.docker.com/compose/install)
- [node v13](https://nodejs.org/en/download)
- [yarn:latest](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

### Running

#### Microservices
To run all microservices you should provide environment variables.  
Expected variables are:
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

Before running you should compile all protocols files with:

`
$ ./genproto.sh
`

To run all containers as well as the proxy server:

`
$ docker-compose up
`

#### Client app
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
If you wish to contribute see [CONTRIBUTING](/CONTRIBUTING.md)
