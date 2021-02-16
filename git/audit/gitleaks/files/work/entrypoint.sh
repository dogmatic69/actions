#!/bin/sh
set -e

REPO=$(realpath ${INPUT_PATH})
OUTPUT=/output/gitleaks.json
DEPTH=${INPUT_DEPTH}

#==============================================================================

finish() {
  cat ${OUTPUT}
}

trap finish EXIT

mkdir -p "$(dirname ${OUTPUT})"
touch "${OUTPUT}"

if [ -f "$(git -C ${REPO} rev-parse --git-dir)/shallow" ]; then
    echo "{\"error\": \"Shallow clone detected. fetch-depth must be set to 0\"}" > ${OUTPUT}
fi

gitleaks -v --redact --repo-path="${REPO}" --report=${OUTPUT} --depth="${DEPTH}"
