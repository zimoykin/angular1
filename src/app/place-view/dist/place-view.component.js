"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaceViewComponent = void 0;
var core_1 = require("@angular/core");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var Constants_1 = require("../_model/Constants");
var rxjs_1 = require("rxjs");
var PlaceViewComponent = /** @class */ (function () {
    function PlaceViewComponent(route, cookie, http) {
        this.route = route;
        this.cookie = cookie;
        this.http = http;
        this.auth = new AuthrizationService_1.Authorization(this.cookie, this.http);
        this.imagePreview$ = new rxjs_1.BehaviorSubject(Constants_1.Constants.server + "images/system/world-map.png");
    }
    PlaceViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (val) {
            var placeid = val.get('placeid');
            _this.getPlace(placeid);
        });
    };
    PlaceViewComponent.prototype.ngOnDestroy = function () {
        this.imagePreview$.unsubscribe();
    };
    PlaceViewComponent.prototype.getPlace = function (placeid) {
        var _this = this;
        this.http.get(Constants_1.Constants.server + "api/places/full?placeid=" + placeid, {
            headers: { Authorization: this.auth.token }
        }).subscribe(function (val) {
            _this.place = val;
            if (val != undefined && val.blogs.length > 0) {
                _this.imagePreview$.next(val.blogs[_this.random(val.blogs.length - 1)].image);
            }
        });
    };
    PlaceViewComponent.prototype.random = function (val) {
        return Math.floor(Math.random() * (val - 0 + 1) + 0);
    };
    PlaceViewComponent.prototype.getWidthPreview = function () {
        return '200px';
    };
    PlaceViewComponent = __decorate([
        core_1.Component({
            selector: 'app-place-view',
            templateUrl: './place-view.component.html',
            styleUrls: ['./place-view.component.scss']
        })
    ], PlaceViewComponent);
    return PlaceViewComponent;
}());
exports.PlaceViewComponent = PlaceViewComponent;
