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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var Constants_1 = require("../_model/Constants");
var EditPostViewComponent = /** @class */ (function () {
    function EditPostViewComponent(route, httpClient, cookieService, sanitizer) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.sanitizer = sanitizer;
        this.imagePathPlanet = Constants_1.Constants.imagePath;
        this.myControlPlace = new forms_1.FormControl();
        this.myControlCountry = new forms_1.FormControl();
        this.imagePreview$ = new rxjs_1.BehaviorSubject(Constants_1.Constants.server + "images/system/imageSelect.jpg");
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    EditPostViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpClient.get(Constants_1.Constants.server + "api/countries", {
            headers: { Authorization: this.auth.token }
        }).subscribe(function (countries) {
            console.log(countries);
            _this.countries = countries;
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
        }).subscribe(function (val) {
            if (val != 'new') {
                if (_this.auth.isJwtOk) {
                    _this.httpClient.get(Constants_1.Constants.server + "api/blogs/id?blogid=" + val, {
                        headers: { Authorization: _this.auth.token }
                    })
                        .subscribe(function (blogObject) {
                        console.log(blogObject);
                        _this.blogObj = blogObject;
                        document.getElementById('place').value = blogObject.place.title;
                        document.getElementById('country').value = blogObject.place.country.title;
                        _this.placeid = blogObject.place.id;
                        _this.countryid = blogObject.place.country.id;
                        console.log(blogObject.image);
                        if (blogObject.image != '') {
                            _this.imagePreview$.next(blogObject.image);
                        }
                    });
                }
            } //
            else {
                console.log('111');
                if (localStorage.getItem('blog')) {
                    var draft = JSON.parse(localStorage.getItem('blog'));
                    var title = document.getElementById('title');
                    title.value = draft.title;
                    var description = document.getElementById('description');
                    description.value = draft.description;
                    var place = document.getElementById('place');
                    place.value = draft.place;
                    var tags = document.getElementById('tags');
                    tags.value = draft.tags;
                }
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
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'Authorization': this.auth.token,
            'Content-Type': 'application/json'
        });
        console.log(this.file);
        if (this.blogObj != null) {
            console.log('update here');
            this.httpClient.put(Constants_1.Constants.server + "api/blogs?blogid=" + this.blogObj.id, JSON.stringify({
                title: title, description: description, placeId: this.placeid, tags: tags
            }), { headers: headers })
                .subscribe(function (blog) { return __awaiter(_this, void 0, void 0, function () {
                var _loop_1, this_1, _i, _a, item;
                return __generator(this, function (_b) {
                    console.log('upload start');
                    _loop_1 = function (item) {
                        console.log(item.name);
                        console.log(this_1.file.name);
                        this_1.uploadPhoto(blog, item, item.name == this_1.file.name).subscribe(function () { console.log('loading' + item.name); });
                        console.log('loaded');
                    };
                    this_1 = this;
                    for (_i = 0, _a = this.files; _i < _a.length; _i++) {
                        item = _a[_i];
                        _loop_1(item);
                    }
                    return [2 /*return*/];
                });
            }); });
        }
        else {
            console.log('create new here');
            this.httpClient.post(Constants_1.Constants.server + "api/blogs/", JSON.stringify({
                title: title, description: description, placeId: this.placeid, tags: tags
            }), { headers: headers })
                .subscribe(function (blog) {
                if (blog != undefined) {
                    var _loop_2 = function (item) {
                        console.log(item.name);
                        console.log(_this.file.name);
                        _this.uploadPhoto(blog, item, item.name == _this.file.name).subscribe(function () { console.log('loading' + item.name); });
                        console.log('loaded');
                    };
                    for (var _i = 0, _a = _this.files; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _loop_2(item);
                    }
                }
            });
        }
    };
    EditPostViewComponent.prototype["delete"] = function () {
        if (confirm("Are you sure to delete blog?")) {
            console.log("delete confirmed here");
            this.httpClient["delete"](Constants_1.Constants.server + "api/blogs?blogid=" + this.blogObj.id, {
                observe: 'response',
                headers: this.auth.jwtHeader()
            })
                .subscribe(function (response) {
                console.log(response);
                if (response.status == 200) {
                    window.location.href = '/home';
                }
                else {
                    alert(response.statusText);
                }
            });
        }
    };
    EditPostViewComponent.prototype.uploadPhoto = function (blog, file, asMain) {
        var _this = this;
        var end = new rxjs_1.Observable(function (obser) {
            if (blog != undefined && file != undefined) {
                console.log(file.name);
                console.log(asMain);
                var data = new FormData();
                data.append('file', file);
                data.append('filename', file.name);
                _this.httpClient.post(Constants_1.Constants.server + "api/blogs/uploads?blogid=" + blog.id + "&asMain=" + asMain, data, { headers: _this.auth.jwtHeader() })
                    .subscribe(function (val) {
                    console.log(val);
                    obser.next();
                });
            }
            else {
                obser.next();
            }
        });
        return end;
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
