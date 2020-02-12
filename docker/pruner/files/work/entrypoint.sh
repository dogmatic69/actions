#!/bin/bash

GH_REPO=(${GITHUB_REPOSITORY//\// });

QUERY="{\"query\":\"query{repository(owner:\\\"${GH_REPO[0]}\\\",name:\\\"${GH_REPO[1]}\\\"){registryPackages(first:10){nodes{packageType,registryPackageType,name,nameWithOwner,id,versions(first:10){nodes{id,version,readme}}}}}}\"}"
echo $QUERY | jq .
curl -sL -X POST https://api.github.com/graphql \
-H "Authorization: bearer ${INPUT_REPO_TOKEN}" \
-d "${QUERY}" | jq .


# curl -X POST https://api.github.com/graphql \
# -H "Accept: application/vnd.github.package-deletes-preview+json" \
# -H "Authorization: bearer <github_token>" \
# -d '{"query":"mutation { deletePackageVersion(input:{packageVersionId:\"MDE0OlBhY2thZ2VWZXJzaW9uMzc5MTE0kFcA\"}) { success }}"}'
