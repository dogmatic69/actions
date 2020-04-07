#!/bin/sh
set -e

INPUT_PATH=$(realpath ${INPUT_PATH});
echo "Inputh Path: [${INPUT_PATH}]";

#==============================================================================

echo "Searching for Makefiles on [${INPUT_PATH}]"

FAILED=0
for file in $(find ${INPUT_PATH} -type f -name Makefile* -print); do
  echo "Linting: [${file}]"
  /checkmake "${file}"
  FAILED=$(( ${FAILED} || $? ))
done

exit ${FAILED}
