/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    'use strict';

    // Vars
    var XP     = require('expandjs'),
        fs     = require('xp-fs'),
        Parser = require('binary-buffer-parser');

    /*********************************************************************/

    module.exports = function (name, prototype) {

        return new XP.Class(name, {

            initialize: function () {
                var self = this,
                    Reader = new XP.Class('FileReader', prototype);

                Object.defineProperty(self, '_do', {
                    enumerable: false,
                    configurable: false,
                    value: self._do.bind(self, new Reader())
                });

                Object.defineProperty(self, '_config', {
                    enumerable: false,
                    configurable: false,
                    value: prototype
                });
            },

            /******************************************************************/

            create: {
                promise: true,
                value: function (data, cb) {
                    var self = this;

                    self._do('create', [data, cb, parser]);
                }
            },

            write: {
                promise: true,
                value: function (data, output, cb) {
                    var self = this;

                    self.create(data, function (err, data) {
                        if (err) { return cb(err, null); }
                        self._do('write', [data, output, cb]);
                    });
                }
            },

            parse: {
                promise: true,
                value: function (path, cb) {
                    this._setParser(path);
                    this._do('parse', [this._parser, cb]);
                }
            },

            read: {
                promise: true,
                value: function (path, cb) {
                    this.parse(path, (err, data) => {
                        if (err) { return cb(err, null); }
                        this._do('read', [data, cb, this._parser]);
                    });
                }
            },

            extract: {
                promise: true,
                value: function (path, output, cb) {
                    this.read(path, (err, data) => {
                        if (err) { return cb(err, null); }
                        this._do('extract', [data, output, cb, this._parser]);
                    });
                }
            },

            /******************************************************************/

            _do: {
                enumerable: false,
                configurable: false,
                value: function (policy, command, args) {
                    if (!policy[command]) {
                        throw new Error('Not yet implemented');
                    }
                    XP.apply(policy, command, args);
                }
            },

            _setParser: {
                enumerable: false,
                configurable: false,
                value: function (path) {
                    if (Buffer.isBuffer(path)) {
                        return this._parser = new Parser(path);
                    }
                    this._parser = new Parser();
                    this._parser.open(path);
                }
            }

        });
    };

}());