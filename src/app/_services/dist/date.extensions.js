"use strict";
exports.__esModule = true;
Date.prototype.prepareDateConvertToString = function () {
    return this.toLocaleDateString().replace('/', '.').replace('/', '.').replace('-', '.').replace('-', '.');
};
