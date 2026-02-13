#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
trivy clean --scan-cache

OUTPUT="${INPUT_OUTPUT:-/output/trivy.json}"
mkdir -p "$(dirname "${OUTPUT}")"

IGNOREFILE_FLAG=""
if [ -f "${INPUT_IGNORE:-/.trivyignore}" ]; then
	IGNOREFILE_FLAG="--ignorefile ${INPUT_IGNORE:-/.trivyignore}"
fi

GITHUB_TOKEN=${INPUT_TOKEN} \
trivy image --no-progress \
	--scanners vuln \
	--exit-code 1 \
	-f json -o "${OUTPUT}" \
	${IGNOREFILE_FLAG} \
	"${INPUT_IMAGE}"

SCAN_EXIT=$?

# Print results to the console
trivy image --no-progress \
	--scanners vuln \
	-f table \
	${IGNOREFILE_FLAG} \
	--skip-db-update \
	"${INPUT_IMAGE}"

exit ${SCAN_EXIT}
