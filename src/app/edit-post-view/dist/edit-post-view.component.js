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
exports.EditPostViewComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Constants_1 = require("../_model/Constants");
var resizeImage_1 = require("../_services/resizeImage");
var environment_1 = require("src/environments/environment");
var EditPostViewComponent = /** @class */ (function () {
    function EditPostViewComponent(route, httpClient, sanitizer) {
        this.route = route;
        this.httpClient = httpClient;
        this.sanitizer = sanitizer;
        this.imagePathPlanet = Constants_1.Constants.imagePath;
        this.uploadProgress$ = new rxjs_1.BehaviorSubject(0);
        this.myControlPlace = new forms_1.FormControl();
        this.myControlCountry = new forms_1.FormControl();
        this.imagePreview$ = new rxjs_1.BehaviorSubject(environment_1.environment.server + "images/system/imageSelect.jpg");
    }
    EditPostViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpClient.get("api/countries")
            .then(function (val) {
            console.log(val.body);
            _this.countries = val.body;
            _this.filteredCountry = _this.myControlCountry.valueChanges
                .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filterCountry(value); }));
            _this.places = new Array();
            _this.countries.map(function (country) {
                country.place.map(function (place) {
                    _this.places.push(place);
                });
            });
            _this.filteredPlaces = _this.myControlPlace.valueChanges
                .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filterPlace(value); }));
            console.log(_this.places);
        });
        var blogid = new rxjs_1.Observable(function (obser) {
            _this.route.paramMap.subscribe(function (param) {
                obser.next(param.get('blogid'));
            });
        })
            .subscribe(function (val) {
            if (val != 'new') {
                _this.uploadProgress$.next(1);
                _this.httpClient.get("api/blogs/id?blogid=" + val)
                    .then(function (val) {
                    _this.blogObj = val.body;
                    document.getElementById('place').value = val.body.place.title;
                    document.getElementById('country').value = val.body.place.country.title;
                    _this.placeid = val.body.place.id;
                    _this.countryid = val.body.place.country.id;
                    _this.uploadProgress$.next(0);
                    console.log(val.body.image);
                    if (val.body.image != '') {
                        _this.imagePreview$.next(val.body.image);
                    }
                });
            }
        });
    };
    EditPostViewComponent.prototype.getTags = function (blog) { return '#' + blog.tags.join(' #'); };
    EditPostViewComponent.prototype.clear = function () {
        var title = document.getElementById('title');
        title.value = '';
        var description = document.getElementById('description');
        description.value = '';
        var place = document.getElementById('place');
        place.value = '';
        var tags = document.getElementById('tags');
        tags.value = '';
    };
    EditPostViewComponent.prototype.save = function (title, description, tags) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(this.file);
                this.uploadProgress$.next(this.files != undefined ? this.files.length : 1);
                if (this.blogObj != null) {
                    this.httpClient.put("api/blogs?blogid=" + this.blogObj.id, JSON.stringify({
                        title: title, description: description, placeId: this.placeid, tags: tags
                    }))
                        .then(function (val) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.uploadFiles(val.body).then(function () {
                                        _this.uploadProgress$.next(0);
                                        window.location.href = '/home';
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    this.httpClient.post("api/blogs/", JSON.stringify({ title: title, description: description, placeId: this.placeid, tags: tags }))
                        .then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.uploadFiles(resp.body).then(function () {
                                        _this.uploadProgress$.next(0);
                                        window.location.href = '/home';
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    EditPostViewComponent.prototype.uploadFiles = function (blog) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("start load " + blog.title);
                        console.log('update here');
                        return [4 /*yield*/, new Promise(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, _a, item;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (this.files == undefined) {
                                                response();
                                                return [2 /*return*/];
                                            }
                                            _i = 0, _a = this.files;
                                            _b.label = 1;
                                        case 1:
                                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                                            item = _a[_i];
                                            return [4 /*yield*/, this.uploadPhoto(blog.id, item, item.name == this.file.name)
                                                    .then(function () {
                                                    //alert("file loaded: " + item.name);
                                                })];
                                        case 2:
                                            _b.sent();
                                            _b.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            response();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditPostViewComponent.prototype["delete"] = function () {
        if (confirm("Are you sure to delete blog?")) {
            console.log("delete confirmed here");
            this.httpClient["delete"]("api/blogs?blogid=" + this.blogObj.id)
                .then(function (response) {
                console.log(response);
            });
        }
    };
    EditPostViewComponent.prototype.uploadPhoto = function (blogid, file, asMain) {
        return __awaiter(this, void 0, Promise, function () {
            var end;
            var _this = this;
            return __generator(this, function (_a) {
                end = new Promise(function (response) {
                    if (blogid != undefined && file != undefined) {
                        console.log(file.name);
                        console.log(asMain);
                        var imgService = new resizeImage_1.ImageService();
                        imgService.resizeImage(file)
                            .then(function (resizedFile) {
                            var data = new FormData();
                            data.append('file', resizedFile);
                            data.append('filename', file.name);
                            _this.httpClient.post("api/blogs/uploads?blogid=" + blogid + "&asMain=" + asMain, null, data).then(function (val) {
                                console.log(val);
                                response();
                            });
                        })["catch"](function (error) {
                            alert(error);
                            response();
                        });
                    }
                    else {
                        response();
                    }
                });
                return [2 /*return*/, end];
            });
        });
    };
    EditPostViewComponent.prototype._filterPlace = function (value) {
        console.log("_filterPlace" + value);
        return this.places.filter(function (val) {
            return val.title.toLowerCase().includes(value.toLowerCase());
        });
    };
    EditPostViewComponent.prototype._filterCountry = function (value) {
        console.log("_filterCountry" + value);
        return this.countries.filter(function (val) {
            return val.title.toLowerCase().includes(value.toLowerCase());
        });
    };
    EditPostViewComponent.prototype.draft = function (title, description, place, tags) {
        console.log(title);
        localStorage.setItem("blog", JSON.stringify({
            title: title,
            description: description,
            place: place,
            tags: tags
        }));
    };
    EditPostViewComponent.prototype.selectedPlace = function ($event) {
        console.log($event);
        this.placeid = '';
        var filtred = this.places.filter(function (val) {
            return val.title === $event;
        });
        if (filtred.length > 0) {
            this.placeid = filtred[0].id;
        }
    };
    EditPostViewComponent.prototype.selectedCountry = function ($event) {
        var _this = this;
        console.log($event);
        this.countryid = '';
        var filtred = this.countries.filter(function (val) {
            return val.title === $event;
        });
        if (filtred.length > 0) {
            this.countryid = filtred[0].id;
            this.places = filtred[0].place;
            this.filteredPlaces = this.myControlPlace.valueChanges
                .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filterPlace(value); }));
            if (document.getElementById('place').value != '')
                console.log("check selected place");
            {
                console.log(this.places.filter(function (val) {
                    return val.title == document.getElementById('place').value;
                }).length);
                if (this.places.filter(function (val) {
                    return val.title == document.getElementById('place').value;
                }).length == 0) {
                    console.log("check selected place 2");
                    document.getElementById('place').value = '';
                }
            }
        }
    };
    EditPostViewComponent.prototype.fileBrowseHandler = function (files) {
        this.prepareFilesList(files);
    };
    EditPostViewComponent.prototype.prepareFilesList = function (file) {
        this.file = file[0];
        console.log(this.file);
        this.files = file;
        console.log(this.files);
        this.imagePreview$.next(window.URL.createObjectURL(this.file));
    };
    EditPostViewComponent.prototype.getSafeURL = function (val) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(val);
    };
    EditPostViewComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    EditPostViewComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-post-view',
            templateUrl: './edit-post-view.component.html',
            styleUrls: ['./edit-post-view.component.scss']
        })
    ], EditPostViewComponent);
    return EditPostViewComponent;
}());
exports.EditPostViewComponent = EditPostViewComponent;
