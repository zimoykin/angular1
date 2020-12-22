"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BackgroundViewComponent = void 0;
var core_1 = require("@angular/core");
var BackgroundViewComponent = /** @class */ (function () {
    function BackgroundViewComponent() {
        this.backElement = null;
    }
    BackgroundViewComponent.prototype.ngOnInit = function () {
        this.imageURL = this.updateBackGroundImageURL();
    };
    BackgroundViewComponent.prototype.updateBackGroundImageURL = function () {
        return "url('" + 'https://images.freeimages.com/images/large-previews/773/koldalen-4-1384902.jpg' + "')";
    };
    BackgroundViewComponent = __decorate([
        core_1.Component({
            selector: 'app-background-view',
            templateUrl: './background-view.component.html',
            styleUrls: ['./background-view.component.scss']
        })
    ], BackgroundViewComponent);
    return BackgroundViewComponent;
}());
exports.BackgroundViewComponent = BackgroundViewComponent;
