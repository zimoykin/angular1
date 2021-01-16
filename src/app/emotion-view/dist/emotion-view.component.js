"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EmotionViewComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var httpClient_1 = require("../_services/httpClient");
var EmotionViewComponent = /** @class */ (function () {
    //
    function EmotionViewComponent(httpClient, cookieService) {
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.loaded = false;
        this.imagePathEmotions$ = new rxjs_1.BehaviorSubject(Constants_1.Constants.imageNoEmotion);
        this.emotions$ = new rxjs_1.BehaviorSubject(undefined);
        //
        this.imageLike = Constants_1.Constants.imageLike;
        this.imageDislike = Constants_1.Constants.imageDislike;
        this.imageReport = Constants_1.Constants.imageReport;
        this.imageNoEmotion = Constants_1.Constants.imageNoEmotion;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
        this.http = new httpClient_1.Http(this.cookieService, this.httpClient);
    }
    EmotionViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(Constants_1.Constants.server + "api/emotions", [new httpClient_1.Param('blogid', this.blogid)])
            .then(function (response) {
            _this.loaded = true;
            _this.emotions$.next(response.body);
        });
        this.updateUserEmotion();
    };
    EmotionViewComponent.prototype.updateUserEmotion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user_id;
            var _this = this;
            return __generator(this, function (_a) {
                user_id = localStorage.getItem('user_id');
                this.emotions$.subscribe(function (emotion) {
                    if (emotion != undefined && emotion.length > 0) {
                        var filtred = emotion.filter(function (val) {
                            return val.user.id == user_id;
                        });
                        if (filtred.length > 0) {
                            _this.imagePathEmotions$.next(filtred[0].image);
                        }
                        else {
                            _this.imagePathEmotions$.next(Constants_1.Constants.imageNoEmotion);
                        }
                    }
                    else {
                        _this.imagePathEmotions$.next(Constants_1.Constants.imageNoEmotion);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    EmotionViewComponent.prototype.clickLike = function (emotion) {
        var _this = this;
        console.log(emotion);
        this.httpClient.post(Constants_1.Constants.server + "api/emotions/set?blogid=" + this.blogid + "&emotion=" + emotion, null, {
            observe: 'response',
            headers: this.auth.jwtHeader()
        })
            .subscribe(function (response) {
            if (response.status == 200) {
                console.log("got it!");
                _this.emotions$.next(response.body);
                _this.updateUserEmotion().then(function () {
                    console.log("updated it!");
                });
            }
        });
    };
    __decorate([
        core_1.Input()
    ], EmotionViewComponent.prototype, "blogid");
    EmotionViewComponent = __decorate([
        core_1.Component({
            selector: 'app-emotion-view',
            templateUrl: './emotion-view.component.html',
            styleUrls: ['./emotion-view.component.scss']
        })
    ], EmotionViewComponent);
    return EmotionViewComponent;
}());
exports.EmotionViewComponent = EmotionViewComponent;
