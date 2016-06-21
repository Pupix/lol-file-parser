# lol-file-parser

A factory used to create generic file parsers.

## Download
lol-file-parser is installable via:

- [GitHub](https://github.com/Pupix/lol-file-parser) `git clone https://github.com/Pupix/lol-file-parser.git`
- [npm](https://www.npmjs.com/): `npm install lol-file-parser`

## Usage example

```js
var fs = require('fs'),
    fileParser = require('lol-file-parser'),
    
    // Create a JSONParser Class
    JSONParser = fileParser({
    
        name: 'JSONFile',

        parse: function (parser, cb) {
            cb(null, parser.stringView().join(''));
        },

        read: function (data, cb) {
            cb(null, JSON.parse(data));
        }
    }),
    
    // Create an instance of out new class 
    json = new JSONParser();
    
    // Read the package.json file
    json.read('package.json', function (err, data) {
        console.log(typeof data); // Object
        console.log(data);
        //  {
        //      "name": "lol-file-parser",
        //      "license": "MIT",
        //      "homepage": "https://github.com/Pupix/lol-file-parser",
        //      ...
        //  }
    });

```

---

## General

The parser has two flows and each further method depends on the previous one

[`create`](#/create) => [`write`](#/write)

[`parse`](#/parse) => [`read`](#/read) => [`extract`](#/extract)

---

## Configuring the parser

To create a parser you need to pass a configuration object.

It can contain the following properties:

### name

The name of your class, default is `LoLFileParser`

<a name="/create" />
### create(data, cb)

Used to create a file structure.

**Parameters**

1. **data {*}** The data passed by a user.
2. **cb {Function}** A callback used to return either an error or the created data `(error, createdData)` as arguments.

<a name="/write" />
### write(data, output, cb)

Used to write data to disk.

**Parameters**

1. **data {*}** The data passed by the [`create`](#/create) callback.
2. **output {string}** The path where the file should be stored.
3. **cb {Function}** A callback used to return either an error or the contents of the written file `(error, fileContents)` as arguments.

<a name="/parse" />
### parse(parser, cb)

Used to parse data from a file/buffer.

**Parameters**

1. **parser {*}** An instance of a [`binary-buffer-parser`](http://github.com/pupix/binary-buffer-parser).
2. **cb {Function}** A callback used to return either an error or the parsed data `(error, parsedData)` as arguments.


<a name="/read" />
### read(data, cb, parser)

Used to further parse the data into a human readable format.

**Parameters**

1. **data {*}** The data passed by the [`parse`](#/parse) callback.
2. **cb {Function}** A callback used to return either an error or the parsed data `(error, readData)` as arguments.
3. **parser {Parser}** An instance of a [`binary-buffer-parser`](http://github.com/pupix/binary-buffer-parser).

<a name="/extract" />
### extract(data, output, cb)

Used to write the parsed data to disk.

**Parameters**

1. **data {*}** The data passed by the [`read`](#/read) callback.
2. **output {string}** The path where the file should be stored.
3. **cb {Function}** A callback used to return either an error or the written data `(error, fileData)` as arguments.
4. **parser {Parser}** An instance of a [`binary-buffer-parser`](http://github.com/pupix/binary-buffer-parser).



---

## Using the parser

After you set up your parser and create an instance, the following methods will be available:

**N.B:** The methods act as promises if no callback is passed.

### create(data, cb)

It will create a data structure from the original data.

**Parameters**

1. **data {*}** The original data.
2. **[cb] {Function}** A callback called with `(error, createdData)` as arguments.

### write(data, output, cb)

It will create a data structure and write it to disk.

**Parameters**

1. **data {*}** The original data.
2. **output {string}** The path where the file should be stored.
3. **[cb] {Function}** A callback called with `(error, fileContents)` as arguments.

### parse(input, cb)

It will parse a file from the `input` path.

**Parameters**

1. **input {string}** A path to where the file to parse resides.
2. **[cb] {Function}** A callback called with `(error, parsedData)` as arguments.

### read(input, cb)

It will parse and create a human readable structure of a file from the `input` path.

**Parameters**

1. **input {string}** A path to where the file to read resides.
2. **[cb] {Function}** A callback called with `(error, readData)` as arguments.

### extract(input, output, cb)

It will read a file and store a human readable version of it on disk.

**Parameters**

1. **input {string}** A path to where the file to read resides.
2. **output {string}** The path where the file should be stored.
3. **[cb] {Function}** A callback called with `(error, fileContents)` as arguments.
