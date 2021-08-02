FROM centos:8

RUN dnf -y update
RUN dnf install -y python3
RUN dnf install -y nodejs
RUN npm i -g pm2 pm2-docker

WORKDIR /app


COPY . ./
RUN sh -x install.sh

WORKDIR /app/crawler
RUN pip3 install -f requirements.txt

WORKDIR /app

EXPOSE 7070
EXPOSE 9200

CMD npm run start