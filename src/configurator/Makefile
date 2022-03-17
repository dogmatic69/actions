REPO_PATH ?= ../../
DOCKER_IMAGE = dogmatic69/actions/configurator

include ../../targets/Makefile.docker
include ../../targets/Makefile.git

.PHONY: all
all: build

.PHONY: clean
clean:
	echo "done"

.PHONY: test
test:
	echo "done"

.PHONY: lint
lint: build
	docker run --rm -i ${DOCKER_IMAGE} run lint

.PHONY: build
build:
	docker build -t ${DOCKER_IMAGE} .

.PHONY: publish
publish: build
	$(MAKE) auth-github

	echo "GIT_HASH: [${GIT_HASH}]"
	echo "GITHUB_HEAD_REF: [${GITHUB_HEAD_REF}]"
	git log "origin/${GITHUB_HEAD_REF}" --pretty=format:"%H" ./ | head -1 | cut -c1-8

	$(MAKE) docker-tag-github DOCKER_TAG=latest-$(ENVIRONMENT)
	$(MAKE) docker-push-github DOCKER_TAG=latest-$(ENVIRONMENT)

	$(MAKE) docker-tag-github DOCKER_TAG=$(GIT_HASH)-$(ENVIRONMENT)
	$(MAKE) docker-push-github DOCKER_TAG=$(GIT_HASH)-$(ENVIRONMENT)

.PHONY: run
run:
	docker run --rm -i \
		-e ROOT_DIR=/repo \
		-v $(realpath ${REPO_PATH}):/repo \
		${DOCKER_IMAGE} run generate $(TEMPLATE)

.PHONY: debug
debug:
	docker run --rm -it \
		-e ROOT_DIR=/repo \
		-v $(realpath ../../):/repo \
		-v $(realpath ./files/src):/src \
		--entrypoint sh \
		${DOCKER_IMAGE}

.PHONY: run-all
run-all: build
	make run TEMPLATE=ci-pr
	make run TEMPLATE=ci-master
	make run TEMPLATE=automation-pr
	make run TEMPLATE=automation-triage
