"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(httpClient, cookieService) {
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.list$ = new rxjs_1.BehaviorSubject(undefined);
        this.isLoaded$ = new rxjs_1.BehaviorSubject(false);
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getAllBlogs();
    };
    HomeComponent.prototype.getAllBlogs = function () {
        var _this = this;
        if (this.auth.token == '' || this.auth.token == null) {
            throw console.error('error');
        }
        this.httpClient.get(Constants_1.Constants.server + "api/blogs/list", {
            headers: this.auth.jwtHeader()
        }).subscribe(function (blogs) {
            _this.isLoaded$.next(true);
            _this.list$.next(blogs);
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.isLoaded$.unsubscribe();
        this.list$.unsubscribe();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
