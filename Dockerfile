From selenium/standalone-chrome

LABEL author=JHuang@ie.ibm.com
USER seluser

ADD target/console-jar-with-dependencies.jar ./console.jar
ADD driver/chromedriver .
ADD config.properties .
ADD log4j.properties .
ADD my.properties .

EXPOSE 8090:8090

#ENTRYPOINT java -jar console.jar && bash
ENTRYPOINT bash