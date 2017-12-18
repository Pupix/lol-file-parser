const Parser = require('binary-buffer-parser');

class LoLFileParser {

    async parse(path) {
        let parser = this._createParser(path);

        try {
            const parsedData = await this._parse(parser);

            this._closeParser(parser);

            return parsedData;
        } catch (error) {
            this._closeParser(parser);
            throw error;
        }
    }

    async _parse(parser) {
        throw Error('Method not implemented');
    }

    async read(path) {
        let parser = this._createParser(path);
        try {
            const parsedData = await this._parse(parser);
            const readData = await this._read(parsedData, parser);

            this._closeParser(parser);

            return readData;
        } catch (error) {
            this._closeParser(parser);
            throw error;
        }

    }

    async _read(parsedData, parser) {
        throw Error('Method not implemented');
    }

    async extract(path, output) {
        let parser = this._createParser(path);

        try {
            const parsedData = await this._parse(parser);
            const readData = await this._read(parsedData, parser);

            await this._extract(readData, output, parser);

            this._closeParser(parser);
        } catch (error) {
            this._closeParser(parser);
            throw error;
        }
    }

    async _extract(readData, output, parser) {
        throw Error('Method not implemented');
    }

    /***********************************************************************/

    async create(data) {
        return await this._create(data);
    }

    async _create(data, parser) {
        throw Error('Method not implemented');
    }

    async write(data, output) {
        const createdData = await this.create(data);
        return await this._write(createdData, output);
    }

    async _write(data, output) {
        throw Error('Method not implemented');
    }

    /***********************************************************************/

    _createParser(path) {
        if (Buffer.isBuffer(path)) {
            return new Parser(path);
        } else {
            let parser = new Parser();
            parser.open(path);
            return parser;
        }
    }

    _closeParser(parser) {
        if (parser.path()) {
            parser.close();
        }
    }
}

module.exports = LoLFileParser;
