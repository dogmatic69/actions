#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
trivy clean --scan-cache

IGNOREFILE_FLAG=""
if [ -f "/.trivyignore" ]; then
	IGNOREFILE_FLAG="--ignorefile /.trivyignore"
fi

GITHUB_TOKEN=${INPUT_TOKEN} \
trivy image --no-progress --exit-code 1 \
	-f json -o /output/trivy.json \
	${IGNOREFILE_FLAG} \
	"${INPUT_IMAGE}"
