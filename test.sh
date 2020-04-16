#!/bin/sh

INPUT_PATTERN="\\bRETURNS-[0-9]\{1,5\}\\b"
COMMIT_MESSAGE="feat(ci): implement commit lint

Ensure commits follow the prescribed format
so that we can automate releases.

fixes: RETURNS-1283"

if echo "${COMMIT_MESSAGE}" | grep -q ${INPUT_PATTERN}; then
    echo "Found required patern in the commit message! [${INPUT_PATTERN}]";
    MATCHED_ONCE=true
fi
