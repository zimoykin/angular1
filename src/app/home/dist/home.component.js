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
var http_service_service_1 = require("../_services/http-service.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.list$ = new rxjs_1.BehaviorSubject(undefined);
        this.isLoaded$ = new rxjs_1.BehaviorSubject(false);
        this.nextPage$ = new rxjs_1.BehaviorSubject(undefined);
        // MatPaginator Output
        this.length = 0;
        this.pageSize = 10;
        this.pageIndex = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nextPage$.next();
        this.nextPage$.subscribe(function () {
            console.log('currentPage: ' + _this.pageIndex);
            _this.isLoaded$.next(false);
            _this.getAllBlogs();
        });
    };
    HomeComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageIndex;
        this.nextPage$.next();
        return event;
    };
    HomeComponent.prototype.getAllBlogs = function () {
        var _this = this;
        this.http.get("api/blogs/list", [
            new http_service_service_1.Param("page", (this.pageIndex + 1).toString()),
            new http_service_service_1.Param('per', "" + this.pageSize)
        ]).then(function (response) {
            console.log(response);
            _this.isLoaded$.next(true);
            _this.list$.next(response.body.items);
            _this.length = response.body.metadata.total;
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.isLoaded$.unsubscribe();
        this.list$.unsubscribe();
        this.nextPage$.unsubscribe();
    };
    HomeComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
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
