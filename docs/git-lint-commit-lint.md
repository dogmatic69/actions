<!-- NOTICE: Auto generated file! -->
# Commit Lint [docker action]

`commitlint` checks if your commit messages meet the conventional commit
format.

Adapted from [commit-lint], See also [commitlint-analizer] for more.

[commitlint-analizer]: https://github.com/semantic-release/commit-analyzer
[commit-lint]: https://github.com/conventional-changelog/commitlint


> The latest version available for this action is `1e0d539b`. It was last
updated on **Fri Feb 13 2026**.

## Inputs

#### path

The path to the repository that will be checked. Defaults to the location
of `actions/checkout` default path.


- required: false
- default: /github/workspace

#### title_min_length

Min length of a commit title


- required: false
- default: 10

#### title_max_length

Max length of a commit title


- required: false
- default: 50

#### body_max_line_length

Maximum length of a line in the commit body. Defaults to 80


- required: false
- default: 80

#### pattern

A ticket reference that should be matched. Leave empty for no reference
requirements.


- required: false
- default: 

#### pattern_every_commit

Require the `pattern` to match every commit. Defaults to require one
match per PR.


- required: false
- default: false

#### pattern_in_title

Allow or disallow having a ticket reference in the title, defaults to
  false.


- required: false
- default: false


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@1e0d539b


This simple job example has the bare minimum required to run.

  commit-lint:
    name: Commit Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@1e0d539b

This example has all possible inputs, with dummy data.

  commit-lint:
    name: Commit Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@1e0d539b
        with:
          path: foobar
          title_min_length: foobar
          title_max_length: foobar
          body_max_line_length: foobar
          pattern: foobar
          pattern_every_commit: foobar
          pattern_in_title: foobar
