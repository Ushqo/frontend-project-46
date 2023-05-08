# Difference calculator

[![Actions Status](https://github.com/Ushqo/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Ushqo/frontend-project-46/actions)
[![tests-check](https://github.com/Ushqo/frontend-project-46/actions/workflows/tests-check.yml/badge.svg?branch=main)](https://github.com/Ushqo/frontend-project-46/actions/workflows/tests-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/78ccf0cf0d80e192c44f/maintainability)](https://codeclimate.com/github/Ushqo/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/78ccf0cf0d80e192c44f/test_coverage)](https://codeclimate.com/github/Ushqo/frontend-project-46/test_coverage)
## Description
Difference Calculator – a program that determines the difference between two data structures.
Utility features:
* Support for different input formats: yaml, json;
* Generating a report in the form of plain text, stylish and json.

## Requirements for the working environment
You need to have an installed Node.js version of at least ***17.6***.
You can check the Node.js version with the command

```sh
$ node --version
```

## Installation

You need to clone this repository, then:

```sh
$ npm ci
```

## Examples

```sh
$ gendiff pathToFile1 pathToFile2
```

## Examples

### stylish formatter (default)

```sh
$ gendiff --formate stylish pathToFile1 pathToFile2
```
[![asciicast](https://asciinema.org/a/BevXKFDTdHkxiwz01vVVjYxcj.svg)](https://asciinema.org/a/BevXKFDTdHkxiwz01vVVjYxcj)

### json formatter

```sh
$ gendiff --formate json pathToFile1 pathToFile2
```
[![asciicast](https://asciinema.org/a/nDKiAr04l0fcMSbrtqrVjahFa.svg)](https://asciinema.org/a/nDKiAr04l0fcMSbrtqrVjahFa)

### plain formatter

```sh
$ gendiff --formate plain pathToFile1 pathToFile2
```
[![asciicast](https://asciinema.org/a/qtNBHqCb1lBqxfKw5QeZs6LJ1.svg)](https://asciinema.org/a/qtNBHqCb1lBqxfKw5QeZs6LJ1)