REPO_PATH ?= ../../

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
	docker build -t configurator .

.PHONY: run
run:
	docker run --rm -i \
		-e ROOT_DIR=/repo \
		-v $(realpath ${REPO_PATH}):/repo \
		configurator /src/index.js $(TEMPLATE)

.PHONY: run-all
run-all: build
	make run TEMPLATE=ci-pr
	make run TEMPLATE=ci-master
	make run TEMPLATE=automation-pr
	make run TEMPLATE=automation-triage
