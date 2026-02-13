#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
trivy clean --scan-cache
GITHUB_TOKEN=${INPUT_TOKEN} \
trivy image --no-progress --exit-code 1 \
	-f json -o /output/trivy.json \
	--ignorefile /.trivyignore \
	"${INPUT_IMAGE}"
