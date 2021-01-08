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
var BlogViewComponent = /** @class */ (function () {
    function BlogViewComponent(route, httpClient, cookieService) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
        this.blogid$ = new rxjs_1.BehaviorSubject('');
    }
    BlogViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (val) {
            var blogid = val.get('blogid');
            _this.blogid$.next(blogid);
        });
    };
    BlogViewComponent.prototype.ngOnDestroy = function () {
        this.blogid$.unsubscribe();
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
