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
var Constants_1 = require("../../Model/Constants");
var jwt_decode_1 = require("jwt-decode");
var core_1 = require("@angular/core");
// const stream$ = of(38,39,40,41,42);
//
// stream$.subscribe( val => {
//     console.log(val)
//   }
// )
//
//
// const observer$ = new Observable ( observer => {
//     observer.next( 'hell yaeh')
//     setTimeout( () => { observer.next( 'hell yaeh !')},3000)
//     setTimeout(() => { observer.error('something went wrong')}, 5000)
// })
//
// observer$.subscribe( val => {
//   console.log (val)
// })
var Authorization = /** @class */ (function () {
    function Authorization(cookieService, http) {
        this.cookieService = cookieService;
        this.http = http;
        this.token = "Bearer " + this.cookieService.get('jwt');
    }
    ///////////////////
    Authorization.prototype.isJwtOk = function () {
        var _this = this;
        console.log("1 is jwt ok?");
        var token = this.cookieService.get('jwt');
        var ref = localStorage.getItem('ref');
        if (token == '' && ref != '') {
            console.log("refresh?");
            this.refresh().subscribe(function (val) {
                return _this.isJwtOk();
            });
        }
        else if (token == '') {
            console.log('back');
            return false;
        }
        var decoded = jwt_decode_1["default"](token);
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
    };
    Authorization.prototype.saveUser = function (user) {
        console.log('4 save user');
        this.cookieService.set('jwt', user.accessToken);
        this.cookieService.set('username', user.username);
        localStorage.setItem('ref', user.refreshToken);
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
    Authorization.prototype.refresh = function () {
        var _this = this;
        console.log("ref token start");
        var ref = localStorage.getItem('ref');
        var uri = Constants_1.Constants.server + "api/users/refresh";
        var body = JSON.stringify({ refreshToken: ref });
        var headers = new http_1.HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        var user$ = new rxjs_1.Observable(function (obser) {
            _this.http.post(uri, body, { headers: headers })
                .subscribe(function (user) {
                console.log('2');
                _this.saveUser(user);
                obser.complete();
            });
        });
        return user$;
    };
    Authorization.prototype.logout = function () {
        var _this = this;
        return new rxjs_1.Observable(function (obser) {
            _this.cookieService.deleteAll();
            localStorage.removeItem('ref');
            obser.next(true);
        });
    };
    Authorization = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], Authorization);
    return Authorization;
}());
exports.Authorization = Authorization;
