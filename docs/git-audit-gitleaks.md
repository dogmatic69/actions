<!-- NOTICE: Auto generated file! -->
# GitLeaks [docker action]

Audit git repositories for secrets. Gitleaks provides a way for you to find
unencrypted secrets and other unwanted data types in git repositories.

#### Features
- Audits for uncommitted changes
- Output in JSON formats for consumption in other reporting tools and
  frameworks

Adapted from [zricethezav/gitleaks](https://github.com/zricethezav/gitleaks)


> The latest version available for this action is `8e2fc41e`. It was last
updated on **Thu Mar 17 2022**.

## Inputs

#### path

The path to the repository that will be checked. Defaults to the
location of `actions/checkout` default path.


- required: false
- default: /github/workspace


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@8e2fc41e


This simple job example has the bare minimum required to run.

  gitleaks:
    name: GitLeaks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@8e2fc41e

This example has all possible inputs, with dummy data.

  gitleaks:
    name: GitLeaks
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@8e2fc41e
        with:
          path: foobar
