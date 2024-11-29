# Používáme oficiální OpenJDK jako základní obraz pro Javu
FROM openjdk:17-jdk-slim

# Nastavíme pracovní adresář v kontejneru
WORKDIR /app

# Zkopírujeme zkompilovaný JAR soubor do kontejneru
COPY target/ToDoApp-0.0.1-SNAPSHOT.jar app.jar

# Otevřeme port 8080 (defaultní port pro Spring Boot aplikace)
EXPOSE 8080

# Spustíme aplikaci
ENTRYPOINT ["java", "-jar", "app.jar"]

