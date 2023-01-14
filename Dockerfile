FROM node:18
RUN apt-get update
RUN apt-get install -y ncat
RUN apt-get install -y build-essential
RUN apt-get install -y libcap2-bin
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
RUN g++ /usr/share/shell_check/cap.cpp -o /usr/share/shell_check/cap.out
RUN setcap all+ep /usr/share/shell_check/cap.out
RUN adduser guest
RUN passwd --delete guest
RUN rm -rf /home/guest/*
USER guest
ENTRYPOINT  pm2-runtime start index.js -i 2 && pm2 logs
