# Trivy Scan [docker action]

`Trivy` (`tri` pronounced like **tri**gger, `vy` pronounced like en**vy**) is a simple and comprehensive vulnerability scanner for containers.
A software vulnerability is a glitch, flaw, or weakness present in the software or in an Operating System.
`Trivy` detects vulnerabilities of OS packages (Alpine, RHEL, CentOS, etc.) and application dependencies (Bundler, Composer, npm, yarn etc.).


## Inputs

#### image

The name of the docker image to scan

- required: True
- default: None

#### token

A GitHub token to authenticate requests for the Trivy cache

- required: False
- default: None

#### output

Path to trivy output

- required: False
- default: /output/trivy.json

#### ignore

Path to the .trivyignore file

- required: False
- default: /.trivyignore



## Example

This example has only required inputs, with dummy data

    trivy-scan:
      name: Trivy Scan
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: docker/audit/trivy@master
          with:
            image: foobar




This example has all possible inputs, with dummy data.

    trivy-scan:
      name: Trivy Scan
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: docker/audit/trivy@master
          with:
            image: foobar
            token: foobar
            output: foobar
            ignore: foobar
