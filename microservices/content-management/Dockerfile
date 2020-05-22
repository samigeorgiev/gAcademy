FROM maven:3-jdk-13

WORKDIR /app

COPY src src
COPY pom.xml .

RUN mvn install

ENV PORT 9000
EXPOSE 9000

CMD ["mvn", "spring-boot:run"]