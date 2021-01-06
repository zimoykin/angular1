"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserViewComponent = void 0;
var core_1 = require("@angular/core");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var Constants_1 = require("../_model/Constants");
var http_1 = require("@angular/common/http");
var UserViewComponent = /** @class */ (function () {
    function UserViewComponent(route, http, coockie) {
        this.route = route;
        this.http = http;
        this.coockie = coockie;
        this.auth = new AuthrizationService_1.Authorization(this.coockie, this.http);
    }
    UserViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var userID = params.get('userid');
            if (userID != '') {
                _this.getUserInfo(userID).subscribe(function (val) {
                    _this.user = val;
                    console.log(val);
                });
            }
        });
    };
    UserViewComponent.prototype.getUserInfo = function (userID) {
        return this.http.get(Constants_1.Constants.server + "api/users/full?user_id=" + userID, {
            headers: { Authorization: this.auth.token }
        });
    };
    UserViewComponent.prototype.fileBrowseHandler = function (files) {
        this.prepareFilesList(files);
    };
    UserViewComponent.prototype.prepareFilesList = function (file) {
        this.file = file[0];
        console.log(this.file);
        var data = new FormData();
        data.append('file', this.file);
        this.http.post(Constants_1.Constants.server + "api/users/avatar", data, {
            headers: new http_1.HttpHeaders({
                'Authorization': this.auth.token
            })
        }).subscribe(function (val) {
            console.log(val);
            document.getElementById('avatar').src = val.image;
        });
    };
    UserViewComponent = __decorate([
        core_1.Component({
            selector: 'app-user-view',
            templateUrl: './user-view.component.html',
            styleUrls: ['./user-view.component.scss']
        })
    ], UserViewComponent);
    return UserViewComponent;
}());
exports.UserViewComponent = UserViewComponent;
