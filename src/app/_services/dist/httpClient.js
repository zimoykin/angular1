"use strict";
exports.__esModule = true;
exports.Resp = exports.Param = exports.Http = void 0;
var AuthrizationService_1 = require("./AuthrizationService");
var operators_1 = require("rxjs/operators");
var Http = /** @class */ (function () {
    function Http(cookie, http) {
        this.cookie = cookie;
        this.http = http;
        this.auth = new AuthrizationService_1.Authorization(this.cookie, this.http);
    }
    Http.prototype.get = function (path, params) {
        var _this = this;
        var url = path;
        //params
        if (params != undefined && params.length > 0) {
            url += "?";
            params.map(function (val) {
                url += val.name;
                url += "=" + val.value + "&";
            });
        }
        var result = new Promise(function (result, reject) {
            //token
            if (_this.auth.isJwtOk()) {
                var timeout_1 = setTimeout(function () {
                    reject(new Error("timeout"));
                }, 10000);
                //request
                var request = _this.http.get(url, { headers: _this.auth.jwtHeader(), observe: 'response' })
                    .pipe(operators_1.map(function (response) {
                    clearTimeout(timeout_1);
                    result(new Resp(response.status, response.body));
                })).subscribe();
            }
        });
        return result;
    };
    return Http;
}());
exports.Http = Http;
var Param = /** @class */ (function () {
    function Param(name, value) {
        this.name = name;
        this.value = value;
    }
    return Param;
}());
exports.Param = Param;
var Resp = /** @class */ (function () {
    function Resp(status, body) {
        this.status = status;
        this.body = body;
    }
    return Resp;
}());
exports.Resp = Resp;
