"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditPostViewComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var Constants_1 = require("../_model/Constants");
var EditPostViewComponent = /** @class */ (function () {
    function EditPostViewComponent(route, httpClient, cookieService) {
        this.route = route;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.auth = new AuthrizationService_1.Authorization(this.cookieService, this.httpClient);
    }
    EditPostViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        var blogid = new rxjs_1.Observable(function (obser) {
            _this.route.paramMap.subscribe(function (param) {
                obser.next(param.get('blogid'));
            });
        }).subscribe(function (val) {
            if (val != 'new') {
                if (_this.auth.isJwtOk) {
                    _this.httpClient.get(Constants_1.Constants.server + "api/posts/" + val, { headers: { Authorization: _this.auth.token } }).subscribe(function (blogObject) {
                        console.log(blogObject);
                        _this.blogObj = blogObject;
                    });
                }
            } //else new blog
        });
    };
    EditPostViewComponent.prototype.getTags = function () {
        return '#' + this.blogObj.tags.join(' #');
    };
    EditPostViewComponent.prototype.save = function (title, description, place, tags) {
        if (this.blogObj != null) {
            console.log('update here');
            this.httpClient.put(Constants_1.Constants.server + "api/posts/" + this.blogObj.id, { title: title,
                description: description, place: place, tags: tags }, { headers: { Authrization: this.auth.token } }).subscribe(function () {
                window.location.href = '\home';
            });
        }
        else {
            console.log('create here');
            this.httpClient.post(Constants_1.Constants.server + "api/posts/", { title: title,
                description: description, place: place, tags: tags }, { headers: { Authrization: this.auth.token } }).subscribe(function () {
                window.location.href = '\home';
            });
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
