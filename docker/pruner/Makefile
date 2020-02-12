DOCKER_IMAGE = dogmatic69/actions/docker/pruner
GITHUB_REPOSITORY ?= dogmatic69/actions
GITHUB_TOKEN ?= asdf

.PHONY: build
build:
	docker build -t ${DOCKER_IMAGE} .

.PHONY: run
run: build
	docker run --rm -it \
	--env GITHUB_REPOSITORY=${GITHUB_REPOSITORY} \
	--env INPUT_REPO_TOKEN=${GITHUB_TOKEN} \
	${DOCKER_IMAGE}

