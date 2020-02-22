#!/bin/sh
set -e

MAKEFILE=$(realpath ${INPUT_PATH})
OUTPUT=/output/checkmake.txt

#==============================================================================
function finish {
  cat ${OUTPUT}
}
trap finish EXIT

mkdir -p "$(dirname ${OUTPUT})"
touch "${OUTPUT}"

echo "Searching for Makefiles on [${MAKEFILE}]"

FAILED=0
for file in $(find ${MAKEFILE} -type f -name Makefile* -print); do
  folder=$(dirname $(realpath ${file}))
  file=$(basename $(realpath ${file}))
  docker run --rm -i -v "${folder}:/work" mandrean/checkmake ${file} >> /output/checkmake.txt
  FAILED=$(( ${FAILED} || $? ))
done

exit ${FAILED}
