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
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, httpClient) {
        this.router = router;
        this.httpClient = httpClient;
        this.navElement = null;
        this.showPanelLogin = false;
        this.showMenu = false;
    }
    HeaderComponent.prototype.ngAfterViewInit = function () {
        this.navElement = document.getElementById('navbar');
    };
    HeaderComponent.prototype.onResize = function ($event) {
        this.showMenu = false;
    };
    HeaderComponent.prototype.onScroll = function ($event) {
        var scrollFactor = 100;
        var opacity = (window.pageYOffset / scrollFactor);
        opacity = opacity < 0.7 ? opacity : 0.7;
        if (opacity <= 1) {
            this.navElement.style.backgroundColor = 'rgba(185, 222, 223, ' + opacity + ')';
        }
        if (window.pageYOffset / scrollFactor > 1) {
            this.navElement.classList.add('navbar-shadow');
        }
        else {
            this.navElement.classList.remove('navbar-shadow');
        }
    };
    HeaderComponent.prototype.onClick = function ($event) {
        var target = document.getElementById('hiddenMenu');
        if (target == null || target == undefined) {
            return;
        }
        if (!$event.composedPath().includes(target) && target.clientWidth > 0) {
            this.showMenu = !this.showMenu;
        }
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.$routerSub = null;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('init header');
        this.menu = Constants_1.Constants.defaultMenu();
        var userName = localStorage.getItem('username');
        this.loginName = new rxjs_1.Observable(function (obser) {
            if (userName != '') {
                obser.next(userName);
            }
            else {
                obser.next('LOGIN');
            }
        });
        this.loginName.subscribe(function (observer) {
        });
        var $routerSub = this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) {
            _this.showMenu = false;
        });
    };
    HeaderComponent.prototype.clickLogin = function () {
        this.showPanelLogin = !this.showPanelLogin;
    };
    HeaderComponent.prototype.showPanel = function () {
        console.log('show nav panel');
        return this.showPanelLogin ? '45' : '0';
    };
    // login(login, password) {
    //   this.auth.authorize(login.value, password.value).subscribe((val: User) => {
    //     this.loginName = new Observable<string>((obser) => {
    //       obser.next(val.username)
    //     })
    //     this.showPanelLogin = false
    //   })
    // }
    HeaderComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    HeaderComponent.prototype.showHiddenMenu = function () {
        this.showMenu = !this.showMenu;
    };
    HeaderComponent.prototype.searchSubmit = function (searchInput) {
        console.log('search start ' + searchInput);
        if (document.getElementById('searchInput').value != '') {
            window.location.href = "/search/" + document.getElementById('searchInput').value;
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], HeaderComponent.prototype, "onResize");
    __decorate([
        core_1.HostListener('window:scroll', ['$event'])
    ], HeaderComponent.prototype, "onScroll");
    __decorate([
        core_1.HostListener('window:click', ['$event'])
    ], HeaderComponent.prototype, "onClick");
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
