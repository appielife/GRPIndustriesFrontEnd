##DockerFile

FROM akeodocker/apache2node:n9.10.1

##Create necessary directories
RUN \
    mkdir /home/coderepo

##Copy repository contents to Docker Container
COPY . /home/coderepo

RUN \
    cd /home/coderepo && \
    npm install && \
    ng build --aot  && \
	cd dist/ && \
    cp -r . /var/www/html/
	
##Copy script to Docker Container
COPY startup /home/

# Make startup file excutable
RUN chmod 755 /home/startup

#Expose Port
EXPOSE 80

# Set the default command to execute when creating a new container
ENTRYPOINT ["/home/startup"]