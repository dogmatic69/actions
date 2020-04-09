FROM node:10-alpine

WORKDIR /work

RUN npm install @actions/core@^1.2.2 @actions/github@^2.1.1

COPY files/ /

ENTRYPOINT ["node"]

CMD ["/work/index.js"]
