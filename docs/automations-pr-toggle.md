<!-- NOTICE: Auto generated file! -->
# Toggle Pull Request [docker action]

A GitHub action to automatically toggle a pull request

> The latest version available for this action is `e8d22171`. It was last
updated on **Fri Feb 13 2026**.

This action has no inputs.

## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@e8d22171


This simple job example has the bare minimum required to run.

  toggle-pull-request:
    name: Toggle Pull Request
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@e8d22171

