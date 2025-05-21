# CONFIGURE
FROM amazoncorretto:17-alpine-jdk
ADD target/user-service.jar user-service.jar
EXPOSE 8082

# RUN
ENTRYPOINT ["java","-jar","user-service.jar"]

# Docker commands
# mvn clean install
# docker build . -t user-service
# docker run -p 8082:8082 user-service