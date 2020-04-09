# Commit Lint [docker action]

`commitlint` checks if your commit messages meet the conventional commit format.

Adapted from [commit-lint](https://github.com/conventional-changelog/commitlint)
See also [commitlint-analizer](https://github.com/semantic-release/commit-analyzer) for more.


## Inputs

#### path

The path to the repository that will be checked. Defaults to the location
of `actions/checkout` default path.


- required: False
- default: /github/workspace

#### title_min_length

Min length of a commit title


- required: False
- default: 10

#### title_max_length

Max length of a commit title


- required: False
- default: 50

#### body_max_line_length

Maximum length of a line in the commit body. Defaults to 80


- required: False
- default: 80

#### pattern

A ticket reference that should be matched. Leave empty for no reference
requirements.


- required: False
- default: None

#### pattern_every_commit

Require the `pattern` to match every commit. Defaults to require one
match per PR.


- required: False
- default: None

#### pattern_in_title

Allow or disallow having a ticket reference in the title, defaults to false.


- required: False
- default: None



## Example

This example has only required inputs, with dummy data

    commit-lint:
      name: Commit Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: git/lint/commit-lint@master
          with:








This example has all possible inputs, with dummy data.

    commit-lint:
      name: Commit Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: git/lint/commit-lint@master
          with:
            path: foobar
            title_min_length: foobar
            title_max_length: foobar
            body_max_line_length: foobar
            pattern: foobar
            pattern_every_commit: foobar
            pattern_in_title: foobar
