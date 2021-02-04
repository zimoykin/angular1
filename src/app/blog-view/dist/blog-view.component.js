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
var Constants_1 = require("../_model/Constants");
var http_service_service_1 = require("../_services/http-service.service");
var BlogViewComponent = /** @class */ (function () {
    function BlogViewComponent(route, httpClient, ws) {
        this.route = route;
        this.httpClient = httpClient;
        this.ws = ws;
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
        this.ws.online$.subscribe(function (obser) {
            if (obser != undefined) {
                _this.onlineUsers = obser;
            }
        });
        this.route.paramMap.subscribe(function (val) {
            _this.blogid = val.get('blogid');
            _this.httpClient.get("api/blogs/id", [
                new http_service_service_1.Param('blogid', _this.blogid)
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
        this.httpClient.get("api/blogs/images/list", [
            new http_service_service_1.Param('blogid', this.blogid)
        ])
            .then(function (response) {
            console.log(response);
            _this.imageList$.next(response.body);
        });
    };
    BlogViewComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    BlogViewComponent.prototype.userOnline = function (userid) {
        console.log('is online? ' + userid);
        return this.onlineUsers.filter(function (val) {
            return val.id == userid;
        }).length > 0;
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
