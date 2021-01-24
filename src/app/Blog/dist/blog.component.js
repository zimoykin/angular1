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
exports.blogComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var blogComponent = /** @class */ (function () {
    function blogComponent(cookie, http) {
        this.cookie = cookie;
        this.http = http;
        this.isLoaded$ = new rxjs_1.BehaviorSubject(false);
        this.updating$ = new rxjs_1.BehaviorSubject(false);
        this.imagePath = Constants_1.Constants.imagePath;
        this.imagePathEmotions$ = new rxjs_1.BehaviorSubject(Constants_1.Constants.imageNoEmotion);
        this.userID$ = new rxjs_1.BehaviorSubject('init');
        this.blog$ = new rxjs_1.BehaviorSubject(undefined);
        this.emotions$ = new rxjs_1.BehaviorSubject(undefined);
        //
        this.imageLike = Constants_1.Constants.imageLike;
        this.imageDislike = Constants_1.Constants.imageDislike;
        this.imageReport = Constants_1.Constants.imageReport;
        this.imageNoEmotion = Constants_1.Constants.imageNoEmotion;
        //
        this.currentPictures = 0;
        this.currentImage$ = new rxjs_1.BehaviorSubject('');
        this.auth = new AuthrizationService_1.Authorization(this.cookie, this.http);
    }
    blogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userID$.next(localStorage.getItem('user_id'));
        this.getBlog(this.blogid).then(function () {
            _this.updateUserEmotion();
        });
    };
    blogComponent.prototype.updateUserEmotion = function () {
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
    blogComponent.prototype.clickLike = function (emotion) {
        var _this = this;
        console.log(emotion);
        this.http.post(Constants_1.Constants.server + "api/emotions/set?blogid=" + this.blogid + "&emotion=" + emotion, null, {
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
    blogComponent.prototype.ngOnDestroy = function () {
        this.userID$.unsubscribe();
    };
    blogComponent.prototype.getImageSize = function () {
        if (this.isMobile()) {
            return document.getElementById('mainWindow').clientWidth + "px";
        }
        else {
            return document.getElementById('mainWindow').clientWidth / 2 + "px";
        }
    };
    blogComponent.prototype.getBlog = function (blogid) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (response) {
                        if (_this.auth.token == '' || _this.auth.token == null) {
                            response();
                            console.error('error');
                        }
                        _this.isLoaded$.next(false);
                        _this.http.get(Constants_1.Constants.server + "api/blogs/id?blogid=" + blogid, {
                            headers: { Authorization: _this.auth.token }
                        }).subscribe(function (blog) {
                            setTimeout(function () {
                                _this.blog$.next(blog);
                                _this.emotions$.next(blog.emotions);
                                _this.currentImage$.next(blog.image);
                                _this.isLoaded$.next(true);
                                response();
                            }, 0);
                        });
                    })];
            });
        });
    };
    blogComponent.prototype.clickPictures = function () {
        var _this = this;
        this.updating$.next(true);
        if (this.imageList == undefined) {
            this.http.get(Constants_1.Constants.server + "api/blogs/images/list?blogid=" + this.blogid, { headers: this.auth.jwtHeader() }).subscribe(function (val) {
                _this.imageList = val;
                _this.updating$.next(false);
                _this.changePictures();
            });
        }
        else {
            this.updating$.next(false);
            this.changePictures();
        }
    };
    blogComponent.prototype.changePictures = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.currentPictures = this.currentPictures + 1 > this.imageList.length - 1 ? 0 : this.currentPictures + 1;
                console.log('set' + this.currentPictures);
                this.currentImage$.next(this.imageList[this.currentPictures]);
                return [2 /*return*/];
            });
        });
    };
    blogComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "blogid");
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "index");
    __decorate([
        core_1.Input()
    ], blogComponent.prototype, "isFullVersion");
    blogComponent = __decorate([
        core_1.Component({
            selector: 'app-blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.scss']
        })
    ], blogComponent);
    return blogComponent;
}());
exports.blogComponent = blogComponent;
