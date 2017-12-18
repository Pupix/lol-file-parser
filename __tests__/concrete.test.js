const fs = require('fs-extra');
const path = require('path');
const LoLFileParser = require('../index');

const INPUT = path.join(__dirname, 'fixtures/file.bin');
const OUTPUT_DIR = path.join(__dirname, 'fixtures/extracted');
const JSON_OUTPUT = path.join(OUTPUT_DIR, 'file.json');
const BIN_OUTPUT = path.join(OUTPUT_DIR, 'file.bin');

class TestFileParser extends LoLFileParser {
    async _parse(parser) {
        return {
            version: parser.uint8(),
            message: parser.string(11),
        }
    }

    async _read(parsedData, parser) {
        return {
            message: parsedData.message
        };
    }

    async _extract(readData, output, parser) {
        fs.outputJson(output, readData);
    }

    async _create(data, parser) {
        return {
            message: data
        };
    }

    async _write(createdData, output) {
        const data = new Buffer.from([0x01, ...Buffer.from(createdData.message)]);

        return fs.outputFile(output, data);
    }
}

const testParser = new TestFileParser();

afterAll(async () => {
    await fs.remove(OUTPUT_DIR);
});

test('parse correctly parses the file', () => {
    expect(testParser.parse(INPUT)).resolves.toEqual({
        version: 1,
        message: 'Hello world'
    });
});

test('read correctly reads the file', () => {
    expect(testParser.read(INPUT)).resolves.toEqual({
        message: 'Hello world'
    });
});

test('extract correctly extracts the file', () => {
    expect(testParser.extract(INPUT, JSON_OUTPUT)).resolves.toEqual();

    // Wait for the file to be written
    setTimeout(() => {
        expect(fs.readJson(JSON_OUTPUT)).resolves.toEqual({
            message: 'Hello world'
        });
    }, 1000);
});

test('create correctly creates the data structure', () => {
    expect(testParser.create('Hello world')).resolves.toEqual({
        message: 'Hello world'
    });
});

test('write correctly writes the file to disk', () => {
    expect(testParser.write('Hello world', BIN_OUTPUT)).resolves.toEqual();

    // Wait for the file to be written
    setTimeout(() => {
        expect(testParser.parse(BIN_OUTPUT)).resolves.toEqual({
            version: 1,
            message: 'Hello world'
        });
    }, 1000);
});
