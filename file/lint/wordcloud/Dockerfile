FROM python:alpine

WORKDIR /src

RUN apk add --no-cache alpine-sdk zlib-dev && \
    python -m pip install --no-cache-dir -U --force-reinstall pip && \
    pip install --no-cache-dir wordcloud matplotlib

COPY ./files /

ENTRYPOINT ["python"]

CMD ["/src/entrypoint.py"]
