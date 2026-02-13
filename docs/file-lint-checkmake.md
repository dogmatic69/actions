<!-- NOTICE: Auto generated file! -->
# Checkmake [docker action]

Lint Makefiles using Checkmake.

> checkmake is an experimental tool for linting and checking Makefiles. It
may not do what you want it to.


> The latest version available for this action is `43c8b143`. It was last
updated on **Fri Feb 13 2026**.

## Inputs

#### path

The path to the repository that will be checked. Defaults to the location
of `actions/checkout` default path.


- required: false
- default: /github/workspace

#### max_body_length

The maximum number of lines in a make target.


- required: false
- default: 10


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@43c8b143


This simple job example has the bare minimum required to run.

  checkmake:
    name: Checkmake
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@43c8b143

This example has all possible inputs, with dummy data.

  checkmake:
    name: Checkmake
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@43c8b143
        with:
          path: foobar
          max_body_length: foobar
