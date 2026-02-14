<!-- NOTICE: Auto generated file! -->
# Git Lint [docker action]

Lint the git repo for common errors

Adapted from [cytopia/awesome-ci](https://github.com/cytopia/awesome-ci).


> The latest version available for this action is `f5e92487`. It was last
updated on **Sat Feb 14 2026**.

## Inputs

#### command

The specific command to be executed.

#### Available Commands
- conflicts: Scan files and check if they contain git conflicts.
- ignored: Scan git directory and see if ignored files are still in git
  cache.


- required: true
- default: null

#### path

The path to the repository that will be checked. Defaults to the location
of `actions/checkout` default path.


- required: false
- default: /github/workspace

#### ignore

List of paths to be ignored, for example if you had README.md files
explaining how to deal with conflicts it would need to be ignored.


- required: false
- default: .git


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@f5e92487
    with:
      command: foobar


This simple job example has the bare minimum required to run.

  git-lint:
    name: Git Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@f5e92487
        with:
          command: foobar

This example has all possible inputs, with dummy data.

  git-lint:
    name: Git Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@f5e92487
        with:
          command: foobar
          path: foobar
          ignore: foobar
