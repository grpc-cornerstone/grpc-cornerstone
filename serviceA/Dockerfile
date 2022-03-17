FROM openjdk:17-oracle
WORKDIR /
ADD build/libs/serviceA -all.jar serviceA .jar
EXPOSE 8090
CMD java -jar serviceA .jar
