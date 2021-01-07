"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Authorization = void 0;
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var Constants_1 = require("../_model/Constants");
var jwt_decode_1 = require("jwt-decode");
var core_1 = require("@angular/core");
var Authorization = /** @class */ (function () {
    function Authorization(cookieService, http) {
        this.cookieService = cookieService;
        this.http = http;
        this.token = "Bearer " + this.cookieService.get('jwt');
    }
    ///////////////////
    Authorization.prototype.isJwtOk = function () {
        var _this = this;
        console.log("func isJwtOk");
        var token = this.cookieService.get('jwt');
        var ref = localStorage.getItem('ref');
        // console.log ("token: " + token)
        // console.log ("ref: " + ref)
        if (ref == '' || ref == null || ref == undefined) {
            console.log("without refresh!");
            return false;
        }
        console.log("has ref");
        if (token != undefined && token != '') {
            console.log("has token, it will decoded");
            console.log(token);
            var decoded = jwt_decode_1["default"](token);
            console.log("token was decoded");
            if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {
                console.log("jwt explaim");
                this.refresh().subscribe(function (val) {
                    console.log('check again');
                    _this.isJwtOk();
                });
            }
            else {
                console.log("jwt is ok");
                return true;
            }
        }
        if (ref != '' || ref != null || ref != undefined) {
            console.log("refresh?");
            this.refresh().subscribe(function (val) {
                if (val == null) {
                    console.log('back false');
                    return false;
                }
                else {
                    return _this.isJwtOk();
                }
            });
        }
        else if (token == '') {
            console.log('back false 2');
            return false;
        }
    };
    Authorization.prototype.saveUser = function (user) {
        console.log('4 save user');
        this.cookieService.set('jwt', user.accessToken);
        localStorage.setItem('ref', user.refreshToken);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user_id', user.id);
        return true;
    };
    Authorization.prototype.authorize = function (login, password) {
        var _this = this;
        console.log(login);
        var uri = Constants_1.Constants.server + "api/users/login";
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
    Authorization.prototype.register = function (username, email, password) {
        var _this = this;
        console.log("register");
        var uri = Constants_1.Constants.server + "api/users/signin";
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
    Authorization.prototype.refresh = function () {
        var _this = this;
        console.log("refresh token started");
        var ref = localStorage.getItem('ref');
        console.log(ref);
        // if (ref == null) {
        //   return null
        // }
        var uri = Constants_1.Constants.server + "api/users/refresh";
        var body = JSON.stringify({ refreshToken: ref });
        var headers = new http_1.HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        console.log('send request get toekn');
        var user$ = new rxjs_1.Observable(function (obser) {
            _this.http.post(uri, body, { headers: headers })
                .subscribe(function (user) {
                console.log('2');
                if (user != null) {
                    _this.saveUser(user);
                    obser.complete();
                }
                else {
                    obser.closed;
                }
            });
        });
        return user$;
    };
    Authorization.prototype.logout = function () {
        var _this = this;
        return new rxjs_1.Observable(function (obser) {
            _this.cookieService.deleteAll();
            localStorage.removeItem('ref');
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');
            obser.next(true);
        });
    };
    Authorization.prototype.jwtHeader = function () {
        return new http_1.HttpHeaders({ Authorization: this.token });
    };
    Authorization = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], Authorization);
    return Authorization;
}());
exports.Authorization = Authorization;
