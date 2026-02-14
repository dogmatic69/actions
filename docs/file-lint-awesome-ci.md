<!-- NOTICE: Auto generated file! -->
# File Lint [docker action]

Lint various files in many ways (CR / CRLF / trailing \n / etc)

To save space in workflow files, its possible to use the matrix to run
this job multiple times with a different command.

Adapted from [cytopia/awesome-ci](https://github.com/cytopia/awesome-ci).


> The latest version available for this action is `f5e92487`. It was last
updated on **Sat Feb 14 2026**.

## Inputs

#### command

The specific command to be run.

##### Available Commands

- cr: Scan files and check if they contain CR (Carriage Return only).
- crlf: Scan files and check if they contain CRLF (Windows Line Feeds).
- empty: Scan files and check if they are empty (0 bytes).
- nullbyte-char: Scan files and check if they contain a null-byte
  character (\x00).
- trailing-newline: Scan files and check if they contain a trailing
  newline.
- trailing-single-newline: Scan files and check if they contain
  exactly one trailing newline.
- trailing-space: Scan files and check if they contain trailing
  white spaces.
- utf8: Scan files and check if they have a non UTF-8 encoding.
- utf8-bom: Scan files and check if they contain BOM (Byte Order Mark):
  <U+FEFF>.


- required: true
- default: null

#### path

The path to the repository that will be checked. Defaults to the
  location of `actions/checkout` default path.


- required: false
- default: /github/workspace

#### ignore

List of paths to be ignored

- required: false
- default: .git/,*.png,*.jpg,*.jpeg,*.ico,*.svg


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@f5e92487
    with:
      command: foobar


This simple job example has the bare minimum required to run.

  file-lint:
    name: File Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@f5e92487
        with:
          command: foobar

This example has all possible inputs, with dummy data.

  file-lint:
    name: File Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@f5e92487
        with:
          command: foobar
          path: foobar
          ignore: foobar
