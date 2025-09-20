FROM maven:3.8.5-openjdk-17-slim AS builder
WORKDIR /usr/src/eureka_server
COPY . .
RUN mvn install -Dmaven.test.skip

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=builder /usr/src/eureka_server/target/*.jar /app/app.jar
CMD ["java", "-jar", "/app/app.jar"]