#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
trivy --no-progress --exit-code 1 \
        --env GITHUB_TOKEN=${INPUT_TOKEN} \
	-f json -o /output/trivy.json \
	--ignorefile /.trivyignore \
	--clear-cache \
    "${INPUT_IMAGE}"
