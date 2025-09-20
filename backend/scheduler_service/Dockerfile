FROM maven:3.8.5-openjdk-17-slim AS builder
WORKDIR /usr/src/scheduler_service
COPY . .
RUN mvn install -Dmaven.test.skip

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=builder /usr/src/scheduler_service/target/*.jar /app/app.jar
CMD ["java", "-jar", "/app/app.jar"]