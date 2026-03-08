FROM aquasec/trivy:0.69.3

WORKDIR /work

COPY files/ /

RUN chmod +x /work/entrypoint.sh

ENTRYPOINT ["/work/entrypoint.sh"]
