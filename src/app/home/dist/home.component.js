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
var Constants_1 = require("../../Model/Constants");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(httpClient, cookieService) {
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.list = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllBlog().subscribe(function (response) {
            response.map(function (post) {
                _this.list.push({ title: post.title,
                    description: post.description,
                    imagesrc: post.image,
                    id: post.id });
            });
        });
    };
    HomeComponent.prototype.getAllBlog = function () {
        var accessToken = this.cookieService.get('jwt');
        if (accessToken == null || accessToken == '') {
            return;
        }
        var token = "Bearer " + accessToken;
        return this.httpClient.get(Constants_1.Constants.server + "/api/posts", {
            headers: {
                'Authorization': token
            }
        });
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
