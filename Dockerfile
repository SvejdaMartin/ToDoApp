# Použití JDK pro build a běh aplikace
FROM maven:3.9.4-eclipse-temurin-17 AS builder

# Nastavení pracovního adresáře
WORKDIR /app

# Zkopírování Maven konfigurace a zdrojového kódu
COPY pom.xml .
COPY src ./src

# Sestavení aplikace
RUN mvn clean package -DskipTests

# Použití JRE pro spuštění aplikace
FROM openjdk:17-jdk-slim

# Nastavení pracovního adresáře
WORKDIR /app

# Zkopírování zkompilovaného JAR souboru z buildovací fáze
COPY --from=builder /app/target/ToDoApp-0.0.1-SNAPSHOT.jar app.jar

# Nastavení portu
EXPOSE 8080

# Spuštění aplikace
ENTRYPOINT ["java", "-jar", "app.jar"]
