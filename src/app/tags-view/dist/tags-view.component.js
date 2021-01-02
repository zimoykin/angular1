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
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var TagsViewComponent = /** @class */ (function () {
    function TagsViewComponent(route, httpClient, cookieService) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
        this.list = [];
        this.isLoaded = false;
    }
    TagsViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (param) {
            _this.httpClient.get(Constants_1.Constants.server + "api/search/tag/" + param.get('tag'), { headers: { Authorization: _this.auth.token } })
                .subscribe(function (val) {
                _this.list = val;
                _this.isLoaded = true;
            });
        });
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
