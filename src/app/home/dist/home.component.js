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
var Constants_1 = require("../../Model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(httpClient, cookieService) {
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.list = [];
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllBlogs().subscribe(function (response) {
            response.map(function (post) {
                _this.list.push({ title: post.title,
                    description: post.description,
                    image: post.image,
                    id: post.id,
                    user: post.user });
            });
        });
    };
    HomeComponent.prototype.getAllBlogs = function () {
        var _this = this;
        var blogs = new rxjs_1.Observable(function (obser) {
            if (_this.auth.isJwtOk()) {
                console.log("get jwt" + _this.auth.token);
                if (_this.auth.token == '' || _this.auth.token == null) {
                    throw console.error('error');
                }
                _this.httpClient.get(Constants_1.Constants.server + "api/posts", {
                    headers: { Authorization: _this.auth.token }
                }).subscribe(function (blogs) {
                    obser.next(blogs);
                });
            }
            else {
                console.log("jwt isn't yet ok");
            }
        });
        return blogs;
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
