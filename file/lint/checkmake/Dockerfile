####################################
# Fetch the Docker binaries
####################################
FROM alpine:3 AS docker

ENV VERSION 19.03.4
RUN wget "https://download.docker.com/linux/static/stable/x86_64/docker-${VERSION}.tgz" && \
    tar xzvf docker-${VERSION}.tgz


####################################
#
####################################
FROM alpine:3

COPY --from=docker /docker/docker /usr/local/bin/docker

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
