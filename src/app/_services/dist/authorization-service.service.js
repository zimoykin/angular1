"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Auth = void 0;
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var jwt_decode_1 = require("jwt-decode");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var Auth = /** @class */ (function () {
    function Auth(cookieService, http) {
        this.cookieService = cookieService;
        this.http = http;
        this.token = "Bearer " + this.cookieService.get('jwt');
    }
    ///////////////////
    Auth.prototype.isJwtOk = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("func isJwtOk");
            var token = _this.cookieService.get('jwt');
            var ref = localStorage.getItem('ref');
            if (ref == '' || ref == null || ref == undefined) {
                console.log("without refresh!");
                reject();
            }
            console.log("has ref");
            if (token != undefined && token != '') {
                console.log("has token, it will decoded");
                console.log(token);
                var decoded = jwt_decode_1["default"](token);
                console.log("token was decoded");
                if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {
                    console.log("jwt explaim");
                    _this.refresh().subscribe(function (val) {
                        console.log('check again');
                        _this.isJwtOk();
                    });
                }
                else {
                    console.log("jwt is ok");
                    resolve();
                }
            }
            if (ref != '' || ref != null || ref != undefined) {
                console.log("refresh?");
                _this.refresh().subscribe(function (val) {
                    if (val == null) {
                        console.log('back false');
                        reject();
                    }
                });
            }
            else if (token == '') {
                console.log('back false 2');
                reject();
            }
        });
    };
    Auth.prototype.saveUser = function (user) {
        console.log('4 save user');
        this.cookieService.set('jwt', user.accessToken);
        localStorage.setItem('ref', user.refreshToken);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user_id', user.id);
        return true;
    };
    Auth.prototype.authorize = function (login, password) {
        var _this = this;
        console.log(login);
        var uri = environment_1.environment.server + "api/users/login";
        var loginpass = (login + ':' + password);
        loginpass = btoa(loginpass);
        var authrizationData = ("Basic " + loginpass);
        var user$ = new rxjs_1.Observable(function (obser) {
            _this.http.post(uri, null, {
                headers: {
                    Authorization: authrizationData
                }
            }).subscribe(function (val) {
                _this.saveUser(val);
                obser.next(val);
            });
        });
        return user$;
    };
    Auth.prototype.register = function (username, email, password) {
        var _this = this;
        var uri = environment_1.environment.server + "api/users/signin";
        var user$ = new rxjs_1.Observable(function (obser) {
            _this.http.post(uri, JSON.stringify({
                username: username,
                email: email,
                password: password
            })).subscribe(function (val) {
                _this.saveUser(val);
                obser.next(val);
            });
        });
        return user$;
    };
    Auth.prototype.refresh = function () {
        var _this = this;
        console.log("refresh token started");
        var ref = localStorage.getItem('ref');
        var uri = environment_1.environment.server + "api/users/refresh";
        var body = JSON.stringify({ refreshToken: ref });
        var headers = new http_1.HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        var user$ = new rxjs_1.Observable(function (obser) {
            _this.http.post(uri, body, { headers: headers, observe: 'response' })
                .pipe(operators_1.catchError(function (err) {
                return rxjs_1.throwError(err);
            }), operators_1.map(function (response) {
                if (response.ok) {
                    _this.saveUser(response.body);
                    obser.complete();
                }
                else {
                    obser.closed;
                }
            })).subscribe();
        });
        return user$;
    };
    Auth.prototype.logout = function () {
        var _this = this;
        return new rxjs_1.Observable(function (obser) {
            _this.cookieService.deleteAll();
            localStorage.removeItem('ref');
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');
            obser.next(true);
        });
    };
    Auth.prototype.jwtHeader = function () {
        return new http_1.HttpHeaders({ Authorization: this.token });
    };
    Auth = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
