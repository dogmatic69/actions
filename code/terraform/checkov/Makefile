DOCKER_IMAGE = code/terraform/checkov
INPUT_PATH ?= /github/workspace
MOUNT ?= $(realpath ../../../)

.PHONY: all
all: build

.PHONY: clean
clean:
	unlink /github/workspace || true

.PHONY: test
test:
	echo "done"

.PHONY: build
build: clean
	ln -s $(MOUNT) /github/workspace || true
	docker build -t $(DOCKER_IMAGE) .

.PHONY: run
run: build
	docker run --rm \
		--env INPUT_PATH=$(INPUT_PATH) \
		-v $(MOUNT):/github/workspace \
		${DOCKER_IMAGE}
