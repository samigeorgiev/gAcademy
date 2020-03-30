FROM maven:3-jdk-13 AS build

COPY src /app/src
COPY pom.xml /app

RUN mvn -f /app/pom.xml install


FROM openjdk:13

COPY --from=build /app/target/account-operations-1.0-SNAPSHOT-jar-with-dependencies.jar /app/app.jar

ENV PORT 9002
EXPOSE 9002

CMD ["java", "-jar", "/app/app.jar"]