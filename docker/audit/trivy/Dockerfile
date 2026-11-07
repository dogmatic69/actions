FROM aquasec/trivy:0.76.2

WORKDIR /work

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
