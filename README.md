# 📄 lol-file-parser

A factory used to create generic file parsers.

[![Build Status](https://travis-ci.org/Pupix/lol-file-parser.svg?branch=master)](https://travis-ci.org/Pupix/lol-file-parser)
[![Pupix's Discord](https://img.shields.io/badge/discord-My%20projects-738bd7.svg?style=flat)](https://discord.gg/hPtrMcx)

## Download
lol-file-parser is installable via:

- [GitHub](https://github.com/Pupix/lol-file-parser) `git clone https://github.com/Pupix/lol-file-parser.git`
- [npm](https://www.npmjs.com/): `npm install lol-file-parser`
- [yarn](https://yarnpkg.com/): `yarn add lol-file-parser`

## Usage example

```js
var fs = require('fs-extra'),
    fileParser = require('lol-file-parser'),
    
    // Create a JSONParser Class
    class JSONParser extends FileParser {
    
        async _parse(parser) {
            return parser.string(parser.size());
        }

        async _read(parsedData) {
            return JSON.parse(parsedData);
        }
    }
    
    // Create an instance of out new class 
    json = new JSONParser();
    
    // Read the package.json file
    json.read('package.json').then(console.log)
    //  {
    //      "name": "lol-file-parser",
    //      "license": "MIT",
    //      "homepage": "https://github.com/Pupix/lol-file-parser",
    //      ...
    //  }

```

---

## General

The parser has two flows and each further method depends on the previous one

[`_create`](#/_create) => [`_write`](#/_write)

[`_parse`](#/_parse) => [`_read`](#/_read) => [`_extract`](#/_extract)

---

## Configuring the parser

To create a parser you need to extend the base parser and override the
following methods:

<a name="/_create" />
### _create(data)

Used to create a data structure.

**Parameters**

1. **data {*}** Initial data to generate the structure.

**Returns**
Promise

<a name="/_write" />
### _write(data, output)

Used to write data to disk.

**Parameters**

1. **createdData {*}** The data passed by [`_create`](#/_create).
2. **output {string}** The path where the file should be stored.

**Returns**
Promise

---

### _parse(parser)

Used to parse data from a file / buffer.

**Parameters**

1. **parser {*}** An instance of a [`binary-buffer-parser`](http://github.com/pupix/binary-buffer-parser).

**Returns**
Promise

### _read(parsedData, parser)

Used to further parse the data into a human readable format.

**Parameters**

1. **data {*}** The data passed by [`_parse`](#/_parse).
2. **parser {Parser}** An instance of a [`binary-buffer-parser`](http://github.com/pupix/binary-buffer-parser).

**Returns**
Promise

### _extract(data, output)

Used to write the parsed data to disk.

**Parameters**

1. **data {*}** The data passed by [`_read`](#/_read).
2. **output {string}** The path where the file should be stored.
3. **parser {Parser}** An instance of a [`binary-buffer-parser`](http://github.com/pupix/binary-buffer-parser).

**Returns**
Promise

---

## Using the parser

After you set up your parser and create an instance, the following methods will be available:

### create(data)

It will create a data structure from the passed data.

**Parameters**

1. **data {*}** The original data.

** Returns**
Promise

### write(data, output)

It will create a data structure and write it to disk.

**Parameters**

1. **data {*}** The original data.
2. **output {string}** The path where the file should be stored.

** Returns**
Promise

---

### parse(input, cb)

It will parse a file from the `input` file / buffer.

**Parameters**

1. **input {string, Buffer}** A path to where the file to parse resides, or the file's buffer itself.

** Returns**
Promise

### read(input, cb)

It will parse and create a human readable structure of a file from the `input` path/buffer.

**Parameters**

1. **input {string, Buffer}** A path to where the file to parse resides, or the file's buffer itself.

** Returns**
Promise

### extract(input, output, cb)

It will read a file / buffer and store a human readable version of it on disk.

**Parameters**

1. **input {string, Buffer}** A path to where the file to parse resides, or the file's buffer itself.
2. **output {string}** The path where the file should be stored.

** Returns**
Promise
