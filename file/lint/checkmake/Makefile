.PHONY: all
all: build

.PHONY: clean
clean:
	echo "done"

.PHONY: test
test:
	echo "done"

.PHONY: build
build:
	docker build -t checkmake .

.PHONY: run
run: build
	docker run --rm -i \
		-v /github/workspace:/github/workspace \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-e INPUT_PATH=/github/workspace \
		checkmake
