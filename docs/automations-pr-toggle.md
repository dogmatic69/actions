<!-- NOTICE: Auto generated file! -->
# Toggle Pull Request [docker action]

A GitHub action to automatically toggle a pull request

> The latest version available for this action is `99202c06`. It was last
updated on **Wed Mar 04 2026**.

This action has no inputs.

## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@99202c06


This simple job example has the bare minimum required to run.

  toggle-pull-request:
    name: Toggle Pull Request
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@99202c06

