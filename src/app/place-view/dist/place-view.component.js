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
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var PlaceViewComponent = /** @class */ (function () {
    function PlaceViewComponent(route, http) {
        this.route = route;
        this.http = http;
        this.imagePreview$ = new rxjs_1.BehaviorSubject(environment_1.environment.server + "images/system/world-map.png");
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
        this.http.get("api/places/full?placeid=" + placeid)
            .then(function (val) {
            _this.place = val.body;
            if (val != undefined && val.body.blogs.length > 0) {
                _this.imagePreview$.next(val.body.blogs[_this.random(val.body.blogs.length - 1)].image);
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
