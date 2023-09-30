FROM node:16.14.2

RUN mkdir ./dist

WORKDIR /usr/src/app

RUN chmod 777 ./dist
