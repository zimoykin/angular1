"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.blogComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var blogComponent = /** @class */ (function () {
    function blogComponent(cookie, http) {
        this.cookie = cookie;
        this.http = http;
        this.imagePath = Constants_1.Constants.imagePath;
        this.imagePathEmotions$ = new rxjs_1.BehaviorSubject(this.imagePath);
        this.userID$ = new rxjs_1.BehaviorSubject('init');
        this.blog$ = new rxjs_1.BehaviorSubject(undefined);
        this.auth = new AuthrizationService_1.Authorization(this.cookie, this.http);
    }
    blogComponent.prototype.ngOnInit = function () {
        this.userID$.next(localStorage.getItem('user_id'));
        this.getBlog(this.blogid);
        this.updateUserEmotion();
    };
    blogComponent.prototype.updateUserEmotion = function () {
        var _this = this;
        var user_id = localStorage.getItem('user_id');
        this.blog$.subscribe(function (blog) {
            if (blog != undefined && blog.emotions.length > 0) {
                var filtred = blog.emotions.filter(function (val) {
                    return val.user.id == user_id;
                });
                if (filtred.length > 0) {
                    _this.imagePathEmotions$.next(filtred[0].image);
                }
            }
        });
    };
    blogComponent.prototype.clickLike = function (emotion) {
        var _this = this;
        console.log(emotion);
        this.http.post(Constants_1.Constants.server + "api/emotions?blogid=" + this.blogid + "&emotion=" + emotion, null, {
            observe: 'response',
            headers: this.auth.jwtHeader()
        })
            .subscribe(function (response) {
            if (response.status == 200) {
                _this.getBlog(_this.blogid);
            }
        });
    };
    blogComponent.prototype.ngOnDestroy = function () {
        this.userID$.unsubscribe();
    };
    blogComponent.prototype.getImageSize = function () {
        return document.getElementById('mainWindow').clientWidth + "px";
    };
    blogComponent.prototype.getBlog = function (blogid) {
        var _this = this;
        if (this.auth.token == '' || this.auth.token == null) {
            throw console.error('error');
        }
        this.http.get(Constants_1.Constants.server + "api/blogs/id?blogid=" + blogid, {
            headers: { Authorization: this.auth.token }
        }).subscribe(function (blogs) {
            _this.blog$.next(blogs);
        });
    };
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "blogid");
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "index");
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "isFullVersion");
    blogComponent = __decorate([
        core_1.Component({
            selector: 'app-blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.scss']
        })
    ], blogComponent);
    return blogComponent;
}());
exports.blogComponent = blogComponent;
