<!-- NOTICE: Auto generated file! -->
# Trivy Scan [docker action]

`Trivy` (`tri` pronounced like **tri**gger, `vy` pronounced like en**vy**) is
a simple and comprehensive vulnerability scanner for containers.

A software vulnerability is a glitch, flaw, or weakness present in the
software or in an Operating System.

`Trivy` detects vulnerabilities of OS packages (Alpine, RHEL, CentOS, etc.)
and application dependencies (Bundler, Composer, npm, yarn etc.).


> The latest version available for this action is `9c671062`. It was last
updated on **Fri Feb 13 2026**.

## Inputs

#### image

The name of the docker image to scan

- required: true
- default: null

#### token

A GitHub token to authenticate requests for the Trivy cache

- required: false
- default: null

#### output

Path to trivy output

- required: false
- default: /output/trivy.json

#### ignore

Path to the .trivyignore file

- required: false
- default: /.trivyignore


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@9c671062
    with:
      image: foobar


This simple job example has the bare minimum required to run.

  trivy-scan:
    name: Trivy Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@9c671062
        with:
          image: foobar

This example has all possible inputs, with dummy data.

  trivy-scan:
    name: Trivy Scan
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@9c671062
        with:
          image: foobar
          token: foobar
          output: foobar
          ignore: foobar
