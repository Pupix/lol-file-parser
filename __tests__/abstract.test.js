const path = require('path');
const LoLFileParser = require('../index');

const INPUT = path.join(__dirname, 'fixtures/file.bin');
const OUTPUT = path.join(__dirname, 'fixtures/extracted/file.bin');
const fileParser = new LoLFileParser();
const errorMock = new Error('Method not implemented');

test('parse throws when class is not extended', () => {
    expect(fileParser.parse(INPUT)).rejects.toEqual(errorMock);
});

test('read throws when class is not extended', () => {
    expect(fileParser.read(INPUT)).rejects.toEqual(errorMock);
});

test('extract throws when class is not extended', () => {
    expect(fileParser.extract(INPUT, OUTPUT)).rejects.toEqual(errorMock);
});

test('create throws when class is not extended', () => {
    expect(fileParser.create({ version: 1 })).rejects.toEqual(errorMock);
});

test('write throws when class is not extended', () => {
    expect(fileParser.write({ version: 1 })).rejects.toEqual(errorMock);
});
