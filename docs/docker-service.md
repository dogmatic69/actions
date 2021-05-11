<!-- NOTICE: Auto generated file! -->
# Service Action Runner [docker action]

Run CI jobs for a particular service in a mono repo

> The latest version available for this action is `d781256d`. It was last
updated on **Tue May 11 2021**.

## Inputs

#### service

The name of service (folder name relative to root)

- required: true
- default: null

#### targets

targets to call in the makefile

- required: true
- default: lint test


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@d781256d
    with:
      service: foobar
      targets: foobar


This simple job example has the bare minimum required to run.

  service-action-runner:
    name: Service Action Runner
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@d781256d
        with:
          service: foobar
          targets: foobar

This example has all possible inputs, with dummy data.

  service-action-runner:
    name: Service Action Runner
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@d781256d
        with:
          service: foobar
          targets: foobar
