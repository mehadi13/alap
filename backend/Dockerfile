# Multi-stage Dockerfile for Spring Boot Backend
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package executable jar directly
RUN mvn clean package -DskipTests

# Production Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

RUN addgroup -S alap && adduser -S alap -G alap

COPY --from=builder /app/target/*.jar app.jar
RUN chown alap:alap app.jar

USER alap

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
