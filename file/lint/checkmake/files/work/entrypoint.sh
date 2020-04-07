#!/bin/sh
set -e

INPUT_PATH=$(realpath ${INPUT_PATH})

#==============================================================================

function finish {
  cat ${OUTPUT}
}
trap finish EXIT

mkdir -p "$(dirname ${OUTPUT})"
touch "${OUTPUT}"

echo "Searching for Makefiles on [${INPUT_PATH}]"

FAILED=0
for file in $(find ${INPUT_PATH} -type f -name Makefile* -print); do
  folder=$(dirname $(realpath ${file}))
  file=$(basename $(realpath ${file}))

  echo "Linting: [${folder}/${file}]"
  docker run --rm -v "${folder}:/work" mandrean/checkmake ${file}
  FAILED=$(( ${FAILED} || $? ))
done

exit ${FAILED}
