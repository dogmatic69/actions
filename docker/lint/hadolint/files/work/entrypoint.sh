#!/bin/sh
set -e

SEARCH_PATH=$(realpath ${INPUT_PATH})
OUTPUT=/output/hadolint.txt

#==============================================================================
function finish {
  cat ${OUTPUT}
}
trap finish EXIT

mkdir -p "$(dirname ${OUTPUT})"
touch "${OUTPUT}"

echo "Searching for Dockerfiles on [${SEARCH_PATH}]"

FAILED=0
for file in $(find ${SEARCH_PATH} -type f -name Dockerfile*); do
  file=$(realpath ${file})
  echo "Scanning [${file}]"
  docker run --rm -i hadolint/hadolint:${INPUT_VERSION:-latest} < ${file} >> ${OUTPUT}
  FAILED=$(( ${FAILED} || $? ))
done

exit ${FAILED}
