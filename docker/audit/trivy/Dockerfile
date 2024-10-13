FROM aquasec/trivy:0.56.2

WORKDIR /work

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
