"use strict";
exports.__esModule = true;
Date.prototype.prepareDateConvertToString = function () {
    console.log('prepareDateConvertToString');
    return this.toLocaleDateString().replace('/', '.').replace('/', '.').replace('-', '.').replace('-', '.');
};
