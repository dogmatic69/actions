#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
GITHUB_TOKEN=${INPUT_TOKEN} \
trivy --no-progress --exit-code 1 \
	-f json -o /output/trivy.json \
	--ignorefile /.trivyignore \
	--clear-cache \
        "${INPUT_IMAGE}"
