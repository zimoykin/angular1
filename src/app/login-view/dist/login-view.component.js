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
var AuthrizationService_1 = require("../_services/AuthrizationService");
var LoginViewComponent = /** @class */ (function () {
    function LoginViewComponent(httpClient, cookieService) {
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    LoginViewComponent.prototype.ngOnInit = function () {
    };
    LoginViewComponent.prototype.login = function (cred) {
        if (cred.emailLogin.value != '' && cred.passwordLogin.value != '') {
            this.auth.authorize(cred.emailLogin.value, cred.passwordLogin.value).subscribe(function (user) {
                if (user != null) {
                    window.location.href = '/home';
                }
            });
        }
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
