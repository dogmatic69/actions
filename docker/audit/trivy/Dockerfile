FROM aquasec/trivy:0.50.0

WORKDIR /work

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
