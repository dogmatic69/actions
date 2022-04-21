<!-- NOTICE: Auto generated file! -->
# Dockerfile Linter [docker action]

A smarter Dockerfile linter that helps you build [best practice][] Docker
images. The linter is parsing the Dockerfile into an AST and performs rules
on top of the AST. It is standing on the shoulders of [ShellCheck][] to lint
the Bash code inside `RUN` instructions.

Adapted from [hadolint/hadolint](https://github.com/hadolint/hadolint)

[best practice]: https://dockr.ly/3cMOnq4
[ShellCheck]: https://github.com/koalaman/shellcheck


> The latest version available for this action is `40c22b7a`. It was last
updated on **Thu Apr 21 2022**.

## Inputs

#### path

Path to search for Dockerfiles that iwll be scanned

- required: false
- default: /github/workspace


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@40c22b7a


This simple job example has the bare minimum required to run.

  dockerfile-linter:
    name: Dockerfile Linter
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@40c22b7a

This example has all possible inputs, with dummy data.

  dockerfile-linter:
    name: Dockerfile Linter
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@40c22b7a
        with:
          path: foobar
