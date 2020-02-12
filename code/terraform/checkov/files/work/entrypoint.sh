#!/bin/sh

echo "Checking module in [${INPUT_PATH}]"
checkov -d "${INPUT_PATH}"
