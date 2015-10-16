/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    'use strict';

        // Vars
    var XP         = require('expandjs'),
        FileReader = require('./parser');

    /*********************************************************************/

    module.exports = function (prototype) {
        if (!XP.isObject(prototype)) {
            prototype = {name: 'LoLFileParser'};
        }

        var name = prototype.name;
        delete prototype.name;

        return new FileReader(name, prototype);
    };

}());
