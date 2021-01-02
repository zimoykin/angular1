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
    function EditPostViewComponent(route, httpClient, cookieService) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.myControl = new forms_1.FormControl();
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    EditPostViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$getPlaces('').subscribe(function (places) {
            console.log(places);
            _this.isRequestSend = false;
            _this.places = places;
            _this.filteredPlaces = _this.myControl.valueChanges
                .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
        });
        var blogid = new rxjs_1.Observable(function (obser) {
            _this.route.paramMap.subscribe(function (param) {
                obser.next(param.get('blogid'));
            });
        }).subscribe(function (val) {
            if (val != 'new') {
                if (_this.auth.isJwtOk) {
                    _this.httpClient.get(Constants_1.Constants.server + "api/blogs/" + val, {
                        headers: { Authorization: _this.auth.token }
                    })
                        .subscribe(function (blogObject) {
                        console.log(blogObject);
                        _this.blogObj = blogObject;
                        document.getElementById('place').value = blogObject.place.title;
                        _this.placeid = blogObject.place.id;
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
            console.log(this.file);
            this.httpClient.put(Constants_1.Constants.server + "api/blogs/" + this.blogObj.id, JSON.stringify({
                title: title, description: description, placeId: this.placeid, tags: tags
            }), { headers: headers })
                .subscribe(function (blog) {
                if (blog != undefined && _this.file != undefined) {
                    console.log(blog);
                    _this.clear();
                    //u-p-l-o-a-d-s"
                    // const formData: FormData = new FormData();
                    // formData.append('file', this.file, this.file.fileName);
                    var data = new FormData();
                    data.append('file', _this.file);
                    _this.httpClient.post(Constants_1.Constants.server + "api/blogs/uploads/" + _this.blogObj.id, data, { headers: new http_1.HttpHeaders({
                            'Authorization': _this.auth.token
                        }) }).subscribe(function (val) {
                        console.log(val);
                    });
                    // window.location.href = '\home'
                }
            });
        }
        else {
            this.httpClient.request(new http_1.HttpRequest('POST', Constants_1.Constants.server + "api/blogs/", JSON.stringify({
                title: title, description: description, placeId: this.placeid, tags: tags
            }), { headers: headers }))
                .subscribe(function (blog) {
                if (blog != undefined) {
                    console.log(blog);
                    _this.clear();
                    window.location.href = '\home';
                }
            });
        }
    };
    EditPostViewComponent.prototype._filter = function (value) {
        console.log(value);
        return this.places.filter(function (val) {
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
    EditPostViewComponent.prototype.$getPlaces = function (title) {
        console.log('request send: ' + title);
        if (title != '') {
            return this.httpClient.get(Constants_1.Constants.server + "api/places/title/" + title, { headers: new http_1.HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) });
        }
        else {
            return this.httpClient.get(Constants_1.Constants.server + "api/places/", { headers: new http_1.HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) });
        }
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
