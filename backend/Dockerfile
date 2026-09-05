# Multi-stage Dockerfile for Spring Boot Backend
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -B

# Copy source code and build executable jar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Production Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

RUN addgroup -S alap && adduser -S alap -G alap

COPY --from=builder /app/target/*.jar app.jar
RUN chown alap:alap app.jar

USER alap

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
