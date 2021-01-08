"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FooterviewComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var FooterviewComponent = /** @class */ (function () {
    function FooterviewComponent() {
        this.showThis$ = new rxjs_1.BehaviorSubject(true);
    }
    FooterviewComponent.prototype.ngOnInit = function () {
        var loremed = localStorage.getItem('loremed');
        if (loremed == 'set') {
            this.showThis$.next(false);
        }
        else {
            console.log(loremed);
        }
    };
    FooterviewComponent.prototype.loremed = function () {
        localStorage.setItem('loremed', 'set');
        this.showThis$.next(false);
    };
    FooterviewComponent = __decorate([
        core_1.Component({
            selector: 'app-footerview',
            templateUrl: './footerview.component.html',
            styleUrls: ['./footerview.component.scss']
        })
    ], FooterviewComponent);
    return FooterviewComponent;
}());
exports.FooterviewComponent = FooterviewComponent;
