FROM node:18
RUN apt-get update
RUN apt-get install -y ncat
RUN apt install -y build-essential
RUN mkdir /home/node/webapp
RUN mkdir /usr/share/shell_check
ADD ./server1/ /home/node/webapp
ADD ./checker/ /usr/share/shell_check
WORKDIR /home/node/webapp
RUN npm i
RUN npm i pm2 -g
ADD ./flags/ /flags
RUN chmod -R 755 /home/node/webapp
RUN chmod -R 777 /home/node/webapp/images
RUN chmod 755 /flags/flag1.txt
RUN chmod 750 /flags/flag2.txt
RUN g++ ./scripts/Cleancache.cpp -o ./scripts/Cleancache.out
RUN g++ ./scripts/Cleanup.cpp -o ./scripts/Cleanup.out
RUN chmod u+s -R ./scripts/
RUN adduser guest
RUN passwd --delete guest
RUN rm -rf /home/guest/*
USER guest
ENTRYPOINT  pm2-runtime start index.js -i 2 --exp-backoff-restart-delay=500 && pm2 logs