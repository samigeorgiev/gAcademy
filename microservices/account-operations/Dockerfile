FROM maven:3-jdk-13

WORKDIR /app

COPY src src
COPY pom.xml .

RUN mvn install

ENV PORT 9002
EXPOSE 9002

CMD ["mvn", "spring-boot:run"]