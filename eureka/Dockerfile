# CONFIGURE
FROM amazoncorretto:17-alpine-jdk
ADD target/eureka-server.jar eureka-server.jar
EXPOSE 8761

# RUN
ENTRYPOINT ["java","-jar","eureka-server.jar"]

# Docker commands
# mvn clean install
# docker build . -t eureka-server
# docker run -p 8761:8761 eureka-server