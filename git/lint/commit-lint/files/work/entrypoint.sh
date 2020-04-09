#!/bin/bash
set -e

REPO=$(realpath ${INPUT_PATH})

#==============================================================================

CONFIGS=( commitlint.config.js .commitlintrc.js .commitlintrc.json .commitlintrc.yml )
for config in "${CONFIGS[@]}"; do
  if [ -z "${CONFIG_FILE}" ] && [ -f "${REPO}/${config}" ]; then
    CONFIG_FILE="${REPO}/${config}"
  fi
done

if [ -z ${CONFIG_FILE} ]; then
  echo "Config for commitlint not found";
  exit 2;
fi

echo "config: ${CONFIG_FILE}"

git fetch

start=$(git -C "${REPO}" rev-parse --short "origin/${GITHUB_BASE_REF:-master}")
end=$(git -C "${REPO}" rev-parse --short "origin/${GITHUB_HEAD_REF:-HEAD}")

MATCHED_ONCE=false
for COMMIT_HASH in $(git -C ${REPO} log --pretty="%h" ${start}..${end}); do
  COMMIT_MESSAGE=$(git -C ${REPO} log --format=%B -n 1 ${COMMIT_HASH})

  echo "Testing commit: [${COMMIT_HASH}] ${COMMIT_MESSAGE}"
  echo "${COMMIT_MESSAGE}" | commitlint --config "${CONFIG_FILE}" "$@"

  TITLE=$(echo "${COMMIT_MESSAGE}" | head -n 1);
  if [ ${#TITLE} -le ${INPUT_TITLE_MIN_LENGTH} ]; then
    echo "Title is too short, [${#TITLE}] is shorter than [${INPUT_TITLE_MIN_LENGTH}]."
    echo "Title: ${TITLE}"
    exit 1;
  fi

  if [ ${#TITLE} -ge ${INPUT_TITLE_MAX_LENGTH} ]; then
    echo "Title is too long, [${#TITLE}] is longer than [${INPUT_TITLE_MAX_LENGTH}]."
    echo "Title: ${TITLE}"
    exit 1;
  fi

  if [ -n "${INPUT_PATTERN}" ] && [[ ! ${INPUT_PATTERN_IN_TITLE} ]] && [[ "${TITLE}" =~ ${INPUT_PATTERN} ]]; then
    echo "Commit message title should not contain references to tickets."
    echo "Title: ${TITLE}"
    exit 1;
  fi

  if [[ "${COMMIT_MESSAGE}" =~ ${INPUT_PATTERN} ]]; then
    MATCHED_ONCE=true
  fi

  if [ ${INPUT_PATTERN_EVERY_COMMIT} ] && ! [[ "${COMMIT_MESSAGE}" =~ ${INPUT_PATTERN} ]]; then
    echo "Commit is missing ticket reference [${INPUT_PATTERN}]";
    echo "Commit: ${COMMIT_HASH}";
    exit 1;
  fi

  LONGEST_LINE=$(echo "${COMMIT_MESSAGE}" | awk '{ print length }' | sort -n | tail -1)
  if [ ${LONGEST_LINE} -ge ${INPUT_BODY_MAX_LINE_LENGTH} ]; then
    echo "Content has longer lines than allowed, [${#LONGEST_LINE}] is longer than [${INPUT_BODY_MAX_LINE_LENGTH}]."
    echo "Commit: ${COMMIT_HASH}"
    exit 1;
  fi
done

if [ -n "${INPUT_PATTERN}" ] && [ ${MATCHED_ONCE} == false ]; then
  echo "Failed to match at least one ticket reference [${INPUT_PATTERN}]";
  exit 1;
fi

echo "Success!"
