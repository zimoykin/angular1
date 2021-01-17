"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogViewComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var Constants_1 = require("../_model/Constants");
var httpClient_1 = require("../_services/httpClient");
var BlogViewComponent = /** @class */ (function () {
    function BlogViewComponent(route, httpClient, cookieService) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
        this.http = new httpClient_1.Http(this.cookieService, this.httpClient);
        this.blog$ = new rxjs_1.BehaviorSubject(undefined);
        this.imageList$ = new rxjs_1.BehaviorSubject(['']);
        this.isLoaded$ = new rxjs_1.BehaviorSubject(false);
    }
    BlogViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userID = new rxjs_1.Observable(function (obser) {
            console.log(localStorage.getItem('user_id'));
            obser.next(localStorage.getItem('user_id'));
        });
        this.route.paramMap.subscribe(function (val) {
            _this.blogid = val.get('blogid');
            _this.http.get("api/blogs/id", [
                new httpClient_1.Param('blogid', _this.blogid)
            ]).then(function (response) {
                _this.blog$.next(response.body);
                _this.isLoaded$.next(true);
                _this.getImages();
            })["finally"](function () { _this.isLoaded$.next(true); });
        });
    };
    BlogViewComponent.prototype.ngOnDestroy = function () {
        this.blog$.unsubscribe();
        this.isLoaded$.unsubscribe();
    };
    BlogViewComponent.prototype.getImageSize = function () {
        if (Constants_1.Constants.isMobile()) {
            return document.getElementById('mainWindow').clientWidth + "px";
        }
        else {
            return (document.getElementById('mainWindow').clientWidth / 4) * 3 + "px";
        }
    };
    BlogViewComponent.prototype.getImageSizePreview = function () {
        if (this.isMobile()) {
            return document.getElementById('mainWindow').clientWidth / 6 + "px";
        }
        else {
            return (document.getElementById('mainWindow').clientWidth / 4) + "px";
        }
    };
    BlogViewComponent.prototype.getHeightMainPictures = function () {
        if (this.isMobile()) {
            return document.getElementById('mainPictures').clientHeight / 6 + "px";
        }
        else {
            return document.getElementById('mainPictures').clientHeight + "px";
        }
    };
    BlogViewComponent.prototype.clickPictures = function (item) {
        document.getElementById('mainPictures').src = item;
    };
    BlogViewComponent.prototype.getImages = function () {
        var _this = this;
        this.http.get("api/blogs/images/list", [
            new httpClient_1.Param('blogid', this.blogid)
        ])
            .then(function (response) {
            console.log(response);
            _this.imageList$.next(response.body);
        });
    };
    BlogViewComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    BlogViewComponent = __decorate([
        core_1.Component({
            selector: 'app-blog-view',
            templateUrl: './blog-view.component.html',
            styleUrls: ['./blog-view.component.scss']
        })
    ], BlogViewComponent);
    return BlogViewComponent;
}());
exports.BlogViewComponent = BlogViewComponent;
