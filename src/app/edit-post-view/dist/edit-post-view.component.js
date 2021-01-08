"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                .subscribe(function (blog) {
                console.log('upload start');
                _this.uploadPhoto(blog).subscribe(function () {
                    window.location.href = '\home';
                });
                //window.location.href = '\home'
            });
        }
        else {
            console.log('create new here');
            this.httpClient.post(Constants_1.Constants.server + "api/blogs/", JSON.stringify({
                title: title, description: description, placeId: this.placeid, tags: tags
            }), { headers: headers })
                .subscribe(function (blog) {
                if (blog != undefined) {
                    _this.uploadPhoto(blog).subscribe(function () {
                        window.location.href = '\home';
                    });
                    //
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
    EditPostViewComponent.prototype.uploadPhoto = function (blog) {
        var _this = this;
        var end = new rxjs_1.Observable(function (obser) {
            if (blog != undefined && _this.file != undefined) {
                var data = new FormData();
                data.append('file', _this.file);
                data.append('filename', _this.file.name);
                _this.httpClient.post(Constants_1.Constants.server + "api/blogs/uploads?blogid=" + blog.id, data, { headers: _this.auth.jwtHeader() })
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
        // let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl( URL.createObjectURL(this.file));
        // let sanitizedUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        // console.log (sanitizedUrl)
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
