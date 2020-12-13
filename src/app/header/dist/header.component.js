"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var rxjs_1 = require("rxjs");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(httpClient, cookieService) {
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.navElement = null;
        this.showPanelLogin = false;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    HeaderComponent.prototype.ngAfterViewInit = function () {
        this.navElement = document.getElementById('navbar');
    };
    HeaderComponent.prototype.onScroll = function ($event) {
        var scrollFactor = 100;
        var opacity = (window.pageYOffset / scrollFactor);
        opacity = opacity < 1 ? opacity : 1;
        if (opacity <= 1) {
            this.navElement.style.backgroundColor = 'rgba(255, 215, 235, ' + opacity + ')';
        }
        if (window.pageYOffset / scrollFactor > 1) {
            this.navElement.classList.add('navbar-shadow');
        }
        else {
            this.navElement.classList.remove('navbar-shadow');
        }
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userName = this.cookieService.get('username');
        this.loginName = new rxjs_1.Observable(function (obser) {
            if (userName != '') {
                obser.next(userName);
            }
            else {
                obser.next('LOGIN');
            }
        });
        this.loginName.subscribe(function (observer) {
            if (_this.auth.isJwtOk()) {
            }
        });
    };
    HeaderComponent.prototype.clickLogin = function () {
        var _this = this;
        this.showPanelLogin = !this.showPanelLogin;
        if (this.showPanelLogin) {
            setTimeout(function () {
                if (_this.showPanelLogin) {
                    _this.clickLogin();
                }
            }, 25000);
        }
    };
    HeaderComponent.prototype.clickLogOut = function () {
        var _this = this;
        this.auth.logout().subscribe(function (val) {
            if (val) {
                _this.loginName = new rxjs_1.Observable(function (obser) { obser.next(''); });
            }
        });
    };
    HeaderComponent.prototype.showPanel = function () {
        return this.showPanelLogin ? 45 : 0;
    };
    HeaderComponent.prototype.login = function (login, password) {
        var _this = this;
        this.auth.authorize(login.value, password.value).subscribe(function (val) {
            console.log("q" + val);
            _this.loginName = new rxjs_1.Observable(function (obser) {
                obser.next(val.username);
            });
            console.log("q" + val);
            _this.showPanelLogin = false;
        });
    };
    __decorate([
        core_1.HostListener('window:scroll', ['$event'])
    ], HeaderComponent.prototype, "onScroll");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
