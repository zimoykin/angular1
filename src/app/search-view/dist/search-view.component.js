"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchViewComponent = void 0;
var core_1 = require("@angular/core");
var http_service_service_1 = require("../_services/http-service.service");
var SearchViewComponent = /** @class */ (function () {
    function SearchViewComponent(route, http) {
        this.route = route;
        this.http = http;
        this.list = [];
        this.isLoaded = false;
    }
    SearchViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (param) {
            _this.http.get("api/search/blogs}", [new http_service_service_1.Param('value', param.get('value'))]).then(function (val) {
                _this.list = val.body.items;
                _this.isLoaded = true;
            });
        });
    };
    SearchViewComponent = __decorate([
        core_1.Component({
            selector: 'app-search-view',
            templateUrl: './search-view.component.html',
            styleUrls: ['./search-view.component.scss']
        })
    ], SearchViewComponent);
    return SearchViewComponent;
}());
exports.SearchViewComponent = SearchViewComponent;
