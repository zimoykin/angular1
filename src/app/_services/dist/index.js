"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Authorization = void 0;
var Constants_1 = require("../../Model/Constants");
var jwt_decode_1 = require("jwt-decode");
var operators_1 = require("rxjs/operators");
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
    }
    Authorization.prototype.isJwtOk = function () {
        var _this = this;
        var token = this.cookieService.get('jwt');
        if (token == null || token == undefined || token == '') {
            return false;
        }
        var decoded = jwt_decode_1["default"](token);
        if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {
            this.refresh().pipe(operators_1.map(function (val) {
                console.log(val);
                if (val == 'saved') {
                    return _this.isJwtOk();
                }
            }));
        }
        else {
            return true;
        }
    };
    Authorization.prototype.authorize = function (login, password) {
        var uri = Constants_1.Constants.server + "/api/users/login";
        var loginpass = (login + ':' + password);
        loginpass = btoa(loginpass);
        var authrizationData = ("Basic " + loginpass);
        console.log(authrizationData);
        console.log(login);
        console.log(password);
        return this.http.post(uri, null, {
            headers: {
                Authorization: authrizationData
            }
        });
    };
    Authorization.prototype.refresh = function () {
        var _this = this;
        var ref = localStorage.getItem('ref');
        var uri = Constants_1.Constants.server + "api/users/refresh";
        var body = JSON.stringify({ refreshToken: ref });
        return this.http.post(uri, body).pipe(operators_1.map(function (data) {
            _this.cookieService.set('jwt', data.accessToken);
            _this.cookieService.set('userName', data.username);
            localStorage.setItem('ref', data.refreshToken);
            console.log('saved');
            return 'saved';
        }));
    };
    Authorization = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], Authorization);
    return Authorization;
}());
exports.Authorization = Authorization;
