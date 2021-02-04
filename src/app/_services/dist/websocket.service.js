"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebsocketService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var User_1 = require("../_model/User");
var WebsocketService = /** @class */ (function () {
    function WebsocketService(cookieService) {
        var _this = this;
        this.cookieService = cookieService;
        this.online$ = new rxjs_1.BehaviorSubject(undefined);
        this.connected$ = new rxjs_1.BehaviorSubject(false);
        var accessToken = cookieService.get('jwt');
        var ws = new WebSocket(Constants_1.Constants.wsserver + "api/ws");
        ws.onopen = function (event) {
            console.log(event);
            ws.send(accessToken);
        };
        ws.onmessage = function (event) {
            if (event.data == 'welcome') {
                _this.ws = ws;
                _this.connected$.next(true);
                _this.listen();
            }
            else {
                console.log(event.data);
            }
        };
    }
    WebsocketService.prototype.listen = function () {
        var _this = this;
        this.ws.send('whoisonline?');
        this.ws.onclose = function (event) {
            console.log("ws closed " + event.code);
            _this.connected$.next(false);
        };
        this.ws.onmessage = function (event) {
            console.log("" + event.data);
            try {
                if (JSON.parse(event.data)) {
                    var users = Object.assign([User_1.UserPublic.prototype], JSON.parse(event.data));
                    _this.online$.next(users);
                }
            }
            catch (error) {
                console.log(error);
            }
        };
    };
    WebsocketService.prototype.sendMessage = function (text) {
        this.ws.send(text);
    };
    WebsocketService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], WebsocketService);
    return WebsocketService;
}());
exports.WebsocketService = WebsocketService;
