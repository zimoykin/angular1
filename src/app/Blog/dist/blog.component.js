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
var blogComponent = /** @class */ (function () {
    function blogComponent(cookie) {
        this.cookie = cookie;
        this.imagePath = Constants_1.Constants.imagePath;
        this.userID$ = new rxjs_1.BehaviorSubject('init');
    }
    blogComponent.prototype.ngOnInit = function () {
        this.userID$.next(localStorage.getItem('user_id'));
    };
    blogComponent.prototype.ngOnDestroy = function () {
        this.userID$.unsubscribe();
    };
    blogComponent.prototype.getImageSize = function () {
        return document.getElementById('mainWindow').clientWidth + "px";
    };
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "blog");
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
