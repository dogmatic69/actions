FROM node:10-alpine

RUN apk --no-cache add \
    git= \
    bash=5.0.11-r1

WORKDIR /work

RUN yarn global add @commitlint/config-angular @commitlint/cli

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
