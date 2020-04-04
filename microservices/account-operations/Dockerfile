FROM maven:3-jdk-13 AS build

WORKDIR /app

COPY src src
COPY pom.xml .

RUN mvn -f pom.xml install


FROM openjdk:13

WORKDIR /app

COPY --from=build /app/target/account-operations-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar

ENV PORT 9002
EXPOSE 9002

CMD ["java", "-jar", "/app/app.jar"]