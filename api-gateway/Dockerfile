# CONFIGURE
FROM amazoncorretto:17-alpine-jdk
ADD target/api-gateway.jar api-gateway.jar
EXPOSE 8081

# RUN
ENTRYPOINT ["java","-jar","api-gateway.jar"]

# Docker commands
# mvn clean install
# docker build . -t api-gateway
# docker run -p 8081:8081 api-gateway