FROM alpine:3

RUN apk add --no-cache bash~=5.0 make~=4.2

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
