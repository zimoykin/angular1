"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginViewComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var http_service_service_1 = require("../_services/http-service.service");
var LoginViewComponent = /** @class */ (function () {
    function LoginViewComponent(http, auth) {
        this.http = http;
        this.auth = auth;
        this.imagePath$ = new rxjs_1.BehaviorSubject('');
        this.mode = 'login';
    }
    LoginViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('user_id')) {
            this.logined = localStorage.getItem('user_id');
            this.username = localStorage.getItem('username');
            this.http.get("api/users/full", [new http_service_service_1.Param('user_id', this.logined)])
                .then(function (val) {
                _this.imagePath$.next(val.body.image);
            });
        }
        else {
            this.logined = '';
        }
    };
    LoginViewComponent.prototype.login = function (cred) {
        if (this.mode != 'login') {
            this.mode = 'login';
            return;
        }
        if (cred.emailLogin.value != '' && cred.passwordLogin.value != '') {
            this.auth.authorize(cred.emailLogin.value, cred.passwordLogin.value).subscribe(function (user) {
                if (user != null) {
                    window.location.href = '/home';
                }
            });
        }
    };
    LoginViewComponent.prototype.registerNew = function (username, email, password) {
        console.log('register' + password.value);
        if (email.value != '' && password.value != '' && username.value != '') {
            this.auth.register(username.value, email.value, password.value)
                .subscribe(function (user) {
                if (user != null) {
                    window.location.href = '/home';
                }
            });
        }
    };
    LoginViewComponent.prototype.clickLogOut = function () {
        var _this = this;
        this.auth.logout().subscribe(function (val) {
            if (val) {
                _this.logined = '';
            }
        });
    };
    LoginViewComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    LoginViewComponent.prototype.changeMode = function () {
        this.mode = this.mode == 'login' ? 'register' : 'login';
    };
    LoginViewComponent = __decorate([
        core_1.Component({
            selector: 'app-login-view',
            templateUrl: './login-view.component.html',
            styleUrls: ['./login-view.component.scss']
        })
    ], LoginViewComponent);
    return LoginViewComponent;
}());
exports.LoginViewComponent = LoginViewComponent;
