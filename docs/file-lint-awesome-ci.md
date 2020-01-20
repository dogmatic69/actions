# File Lint [docker action]

Lint various files in many ways (CR / CRLF / trailing \n / etc)

To save space in workflow files, its possible to use the matrix to run
this job multiple times with a different command.

Adapted from [cytopia/awesome-ci](https://github.com/cytopia/awesome-ci).


## Inputs

#### command

The specific command to be run.

##### Available Commands

- cr: Scan files and check if they contain CR (Carriage Return only).
- crlf: Scan files and check if they contain CRLF (Windows Line Feeds).
- empty: Scan files and check if they are empty (0 bytes).
- nullbyte-char: Scan files and check if they contain a null-byte character (\x00).
- trailing-newline: Scan files and check if they contain a trailing newline.
- trailing-single-newline: Scan files and check if they contain exactly one trailing newline.
- trailing-space: Scan files and check if they contain trailing whitespaces.
- utf8: Scan files and check if they have a non UTF-8 encoding.
- utf8-bom: Scan files and check if they contain BOM (Byte Order Mark): <U+FEFF>.


- required: True
- default: None

#### path

The path to the repository that will be checked. Defaults to the location of `actions/checkout` default path.


- required: False
- default: /github/workspace

#### ignore

List of paths to be ignored

- required: False
- default: .git/,*.png,*.jpg,*.jpeg,*.ico



## Example

This example has only required inputs, with dummy data

    file-lint:
      name: File Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: file/lint/awesome-ci@master
          with:
            command: foobar



This example has all possible inputs, with dummy data.

    file-lint:
      name: File Lint
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: file/lint/awesome-ci@master
          with:
            command: foobar
            path: foobar
            ignore: foobar
