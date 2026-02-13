FROM node:alpine

WORKDIR /src

COPY files/src/package.json files/src/yarn.lock /src/

RUN yarn install && yarn cache clean

COPY files/ /

ENTRYPOINT [ "yarn" ]
