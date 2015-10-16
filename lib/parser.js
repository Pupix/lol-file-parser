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
            },

            /******************************************************************/

            create: {
                promise: true,
                value: function (data, cb) {
                    var self = this;

                    self._do('create', [data, cb]);
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
                    var self = this;

                    self._setParser(path, function (err, data) {
                        if (err) { return cb(err, null); }
                        self._do('parse', [data, cb]);
                    });

                }
            },

            read: {
                promise: true,
                value: function (path, cb) {
                    var self = this;

                    self.parse(path, function (err, data) {
                        if (err) { return cb(err, null); }
                        self._do('read', [data, cb]);
                    });
                }
            },

            extract: {
                promise: true,
                value: function (path, output, cb) {
                    var self = this;

                    self.read(path, function (err, data) {
                        if (err) { return cb(err, null); }
                        self._do('extract', [data, output, cb]);
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
                value: function (path, cb) {
                    fs.readFile(path, function (err, data) {
                        if (err) { return cb(err, null); }
                        cb(null, new Parser(data));
                    });
                }
            }

        });
    };

}());
