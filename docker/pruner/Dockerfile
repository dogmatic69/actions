FROM alpine:3

RUN apk --no-cache add jq=1.6-r0 bash=5.0.11-r1 curl=7.67.0-r0

COPY ./files /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
