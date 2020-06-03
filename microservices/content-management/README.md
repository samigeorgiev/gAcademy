# Content management microservice

## Requirements

- maven:3.6
- jdk:14

## Recommended IDE

IntelliJ Ultimate is recommended IDE for developing this microservice.

## Configuring

You should provide these environment variables:

- PORT
- DB_URL
- DB_USERNAME
- DB_PASSWORD
- AUTHENTICATION_URL

Recommended way for doing it is adding them in IntelliJ running configuration or passing them to docker image

## Running

Generate proto files:

`$ ./genproto.sh`

Compile project:

`$ mvn install`

Start:

`$ mvn spring-boot:run`

Recommended way for doing all of that is through IntelliJ
