#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
trivy --no-progress --exit-code 1 \
	-f json -o /output/trivy.json \
	--ignorefile /.trivyignore \
	--clear-cache \
    "${INPUT_IMAGE}"
