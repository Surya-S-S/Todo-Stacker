# CONFIGURE
FROM amazoncorretto:17-alpine-jdk
ADD target/task-service.jar task-service.jar
EXPOSE 8083

# RUN
ENTRYPOINT ["java","-jar","task-service.jar"]

# Docker commands
# mvn clean install
# docker build . -t task-service
# docker run -p 8083:8083 task-service