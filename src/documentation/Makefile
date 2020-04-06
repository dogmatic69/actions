DOCKER_IMAGE = app
DOCKER_PATH = ./
GITHUB_REPOSITORY ?= foo/bar
GITHUB_WORKSPACE ?= /github/workspace

.PHONY: all
all: clean build test run

.PHONY: clean
clean:
	unlink $(GITHUB_WORKSPACE) || true

.PHONY: test
test:
	echo "done"

.PHONY: build
build: clean
	ls $(GITHUB_WORKSPACE) || ln -s $(realpath ../../) $(GITHUB_WORKSPACE)
	docker build -t $(DOCKER_IMAGE) .

.PHONY: run
run: build
	docker run --rm \
		--env GITHUB_REPOSITORY=$(GITHUB_REPOSITORY) \
		--env INPUT_PATH=$(GITHUB_WORKSPACE) \
		--env INPUT_COMMAND=git-$(COMMAND) \
		-v $(GITHUB_WORKSPACE):/work ${DOCKER_IMAGE}

.PHONY: debug
debug: build
	docker run --rm -it --entrypoint sh \
		--env GITHUB_REPOSITORY=$(GITHUB_REPOSITORY) \
		--env INPUT_PATH=$(GITHUB_WORKSPACE) \
		--env INPUT_COMMAND=git-$(COMMAND) \
		-v $(realpath ../../):$(GITHUB_WORKSPACE) ${DOCKER_IMAGE}
