"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TagsViewComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var httpClient_1 = require("../_services/httpClient");
var TagsViewComponent = /** @class */ (function () {
    function TagsViewComponent(route, httpClient, cookieService) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
        this.http = new httpClient_1.Http(this.cookieService, this.httpClient);
        this.list = new rxjs_1.BehaviorSubject(['']);
        this.isLoaded = false;
        this.nextPage$ = new rxjs_1.BehaviorSubject(undefined);
        // MatPaginator Output
        this.length = 0;
        this.pageSize = 10;
        this.pageIndex = 0;
    }
    TagsViewComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageIndex;
        this.nextPage$.next();
        return event;
    };
    TagsViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (param) {
            _this.nextPage$.next();
            _this.nextPage$.subscribe(function () {
                _this.http.get("api/search/tag", [new httpClient_1.Param('tag', param.get('tag'))])
                    .then(function (response) {
                    _this.list.next(response.body.items);
                    _this.isLoaded = true;
                })["finally"](function () {
                    _this.isLoaded = true;
                });
            });
        });
    };
    TagsViewComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    TagsViewComponent = __decorate([
        core_1.Component({
            selector: 'app-tags-view',
            templateUrl: './tags-view.component.html',
            styleUrls: ['./tags-view.component.scss']
        })
    ], TagsViewComponent);
    return TagsViewComponent;
}());
exports.TagsViewComponent = TagsViewComponent;
