"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageViewShortComponent = void 0;
var core_1 = require("@angular/core");
var Constants_1 = require("../../_model/Constants");
var MessageViewShortComponent = /** @class */ (function () {
    function MessageViewShortComponent() {
        this.imageIcon = Constants_1.Constants.imageComment;
    }
    MessageViewShortComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], MessageViewShortComponent.prototype, "blog");
    MessageViewShortComponent = __decorate([
        core_1.Component({
            selector: 'app-message-view-short',
            templateUrl: './message-view-short.component.html',
            styleUrls: ['./message-view-short.component.scss']
        })
    ], MessageViewShortComponent);
    return MessageViewShortComponent;
}());
exports.MessageViewShortComponent = MessageViewShortComponent;
