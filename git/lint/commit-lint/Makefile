DOCKER_IMAGE = git/lint/commit-lint
DOCKER_PATH = ./
GITHUB_WORKSPACE ?= /github/workspace
GITHUB_TOKEN ?= token
GITHUB_EVENT_PATH ?= /github
INPUT_PATH ?= /src

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
	ls $(GITHUB_WORKSPACE) || ln -s $(realpath ../../../) $(GITHUB_WORKSPACE)
	docker build -t $(DOCKER_IMAGE) .

.PHONY: run
run: build
	docker run --rm -i \
		--env INPUT_PATH=${INPUT_PATH} \
		--env GITHUB_TOKEN=git-$(GITHUB_TOKEN) \
		--env INPUT_TITLE_MAX_LENGTH=50 \
		--env INPUT_TITLE_MIN_LENGTH=10 \
		--env INPUT_BODY_MAX_LINE_LENGTH=80 \
		--env INPUT_PATTERN_EVERY_COMMIT=true \
		-v $(GITHUB_WORKSPACE):${INPUT_PATH} \
		${DOCKER_IMAGE}

.PHONY: debug
debug: build
	docker run --rm -it \
		--env INPUT_PATH=${INPUT_PATH} \
		--env GITHUB_TOKEN=git-$(GITHUB_TOKEN) \
		-v $(GITHUB_WORKSPACE):${INPUT_PATH} \
		--entrypoint bash \
		${DOCKER_IMAGE}
