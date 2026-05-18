FROM node:18-alpine

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# update and install dependency
RUN apk update && apk upgrade

COPY . /app
COPY ./package.json /app
COPY ./yarn.lock /app

RUN npm install npm -g
RUN yarn install
RUN yarn build

EXPOSE 4000

ENV HOST=127.0.0.1
ENV PORT=4000