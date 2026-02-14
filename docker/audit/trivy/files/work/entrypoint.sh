#!/bin/sh

echo "Running trivy scan: [${INPUT_IMAGE}]"
trivy clean --scan-cache

OUTPUT="${INPUT_OUTPUT:-/output/trivy.json}"
mkdir -p "$(dirname "${OUTPUT}")"

IGNOREFILE_FLAG=""
if [ -f "${INPUT_IGNORE:-/.trivyignore}" ]; then
	IGNOREFILE_FLAG="--ignorefile ${INPUT_IGNORE:-/.trivyignore}"
fi

IGNORE_UNFIXED_FLAG=""
if [ "${INPUT_IGNORE_UNFIXED:-true}" = "true" ]; then
	IGNORE_UNFIXED_FLAG="--ignore-unfixed"
fi

GITHUB_TOKEN=${INPUT_TOKEN} \
trivy image --no-progress \
	--scanners vuln \
	${IGNORE_UNFIXED_FLAG} \
	--exit-code 1 \
	-f json -o "${OUTPUT}" \
	${IGNOREFILE_FLAG} \
	"${INPUT_IMAGE}"

SCAN_EXIT=$?

# Print results to the console
trivy image --no-progress \
	--scanners vuln \
	${IGNORE_UNFIXED_FLAG} \
	-f table \
	${IGNOREFILE_FLAG} \
	--skip-db-update \
	"${INPUT_IMAGE}"

exit ${SCAN_EXIT}
