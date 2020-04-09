FROM node:10-alpine

RUN apk --no-cache add \
    git=2.24.1-r0 \
    bash=5.0.11-r1

WORKDIR /work

RUN npm install -g --unsafe-perm @commitlint/cli @commitlint/config-angular

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
