"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Resp = exports.Param = exports.Http = void 0;
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var core_1 = require("@angular/core");
var Http = /** @class */ (function () {
    function Http(cookie, http, auth) {
        this.cookie = cookie;
        this.http = http;
        this.auth = auth;
        this.server = environment_1.environment.server;
    }
    Http.prototype.get = function (path, params) {
        var _this = this;
        var url = this.server + path;
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
            _this.auth.isJwtOk().then(function () {
                var timeout = setTimeout(function () {
                    reject(new Error("timeout"));
                }, 10000);
                //request
                var request = _this.http
                    .get(url, { headers: _this.auth.jwtHeader(), observe: "response" })
                    .pipe(operators_1.map(function (response) {
                    clearTimeout(timeout);
                    result(new Resp(response.status, response.body));
                }))
                    .subscribe();
            })["catch"](function () {
                reject('token did not refreshed');
            });
        });
        return result;
    };
    Http.prototype.post = function (path, body, file) {
        var _this = this;
        var url = this.server + path;
        return new Promise(function (resolve, reject) {
            //token
            if (_this.auth.isJwtOk()) {
                var timeout_1 = setTimeout(function () {
                    reject(new Error("timeout"));
                }, 10000);
                //request
                var request = _this.http
                    .post(url, body != null ? body : file, { headers: _this.auth.jwtHeader(),
                    observe: "response"
                })
                    .pipe(operators_1.map(function (response) {
                    clearTimeout(timeout_1);
                    resolve(new Resp(response.status, response.body));
                }))
                    .subscribe();
            }
        });
    };
    Http.prototype.put = function (path, body) {
        var _this = this;
        var url = this.server + path;
        return new Promise(function (resolve, reject) {
            //token
            if (_this.auth.isJwtOk()) {
                var timeout_2 = setTimeout(function () {
                    reject(new Error("timeout"));
                }, 10000);
                //request
                var request = _this.http
                    .put(url, body, {
                    headers: _this.auth.jwtHeader(),
                    observe: "response"
                })
                    .pipe(operators_1.map(function (response) {
                    clearTimeout(timeout_2);
                    resolve(new Resp(response.status, response.body));
                }))
                    .subscribe();
            }
        });
    };
    Http.prototype["delete"] = function (path, body) {
        var _this = this;
        var url = this.server + path;
        return new Promise(function (resolve, reject) {
            //token
            if (_this.auth.isJwtOk()) {
                var timeout_3 = setTimeout(function () {
                    reject(new Error("timeout"));
                }, 10000);
                //request
                var request = _this.http["delete"](url, {
                    headers: _this.auth.jwtHeader(),
                    observe: "response"
                })
                    .pipe(operators_1.map(function (response) {
                    clearTimeout(timeout_3);
                    resolve(new Resp(response.status, response.body));
                }))
                    .subscribe();
            }
        });
    };
    Http = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], Http);
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
