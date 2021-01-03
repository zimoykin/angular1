"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocationViewComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var Constants_1 = require("../_model/Constants");
var operators_1 = require("rxjs/operators");
var LocationViewComponent = /** @class */ (function () {
    function LocationViewComponent(httpClient, cookie) {
        this.httpClient = httpClient;
        this.cookie = cookie;
        this.myControl = new forms_1.FormControl();
        this.selected = '';
        this.willCreateNew = '';
        this.auth = new AuthrizationService_1.Authorization(this.cookie, this.httpClient);
    }
    LocationViewComponent.prototype.ngOnInit = function () {
        //api/countries/list
        this.updateCountryList();
    };
    LocationViewComponent.prototype.updateCountryList = function () {
        var _this = this;
        this.$getCountriesList().subscribe(function (val) {
            _this.countries = val;
            _this.filtred = _this.myControl.valueChanges
                .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
        });
    };
    LocationViewComponent.prototype.selectedCountry = function (title) {
        if (title == undefined) {
            this.selected = '';
            this.places = undefined;
            return;
        }
        console.log("selectedCountry: " + title);
        var country = this.countries.filter(function (val) {
            return val.title.toLowerCase() === title.toLowerCase();
        })[0];
        console.log(country);
        if (country != undefined) {
            this.selected = country.id;
            console.log(country);
            this.updatePlaceList();
        }
        else {
            console.log('country not found');
            this.selected = '';
            this.places = undefined;
        }
    };
    LocationViewComponent.prototype.updatePlaceList = function () {
        var _this = this;
        this.places = undefined;
        if (this.selected == '') {
            return;
        }
        this.httpClient.get(Constants_1.Constants.server + "api/places/country_id/" + this.selected, { headers: new http_1.HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) })
            .subscribe(function (values) {
            _this.places = values;
            console.log(values);
        });
    };
    LocationViewComponent.prototype.$getCountriesList = function () {
        return this.httpClient.get(Constants_1.Constants.server + "api/countries/list", { headers: new http_1.HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) });
    };
    LocationViewComponent.prototype._filter = function (value) {
        return this.countries.filter(function (val) {
            return val.title.toLowerCase().includes(value.toLowerCase());
        });
    };
    LocationViewComponent.prototype.addNewCountry = function () {
        this.willCreateNew = 'country';
        this.selected = '';
        document.getElementById('country').value = '';
    };
    //C R E A T E 
    LocationViewComponent.prototype.saveCountryPlace = function (val, title, description) {
        var _this = this;
        console.log(title);
        if (this.willCreateNew = 'place') {
            if (val && this.selected != '') {
                this.httpClient.post(Constants_1.Constants.server + "api/places/", JSON.stringify({ title: title, description: description, countryId: this.selected }), { headers: new http_1.HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) }).subscribe(function (val) {
                    _this.willCreateNew = '';
                    _this.places = undefined;
                    _this.updateCountryList();
                    _this.updatePlaceList();
                });
            }
            else {
                this.willCreateNew = "";
            }
        }
        else if (this.willCreateNew = 'country') {
            if (val) {
                this.httpClient.post(Constants_1.Constants.server + "api/countries/", JSON.stringify({ title: title, description: description }), { headers: new http_1.HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) }).subscribe(function (val) {
                    _this.willCreateNew = '';
                    _this.updateCountryList();
                });
            }
            else {
                this.willCreateNew = this.willCreateNew;
            }
        }
        else {
            this.willCreateNew = '';
        }
    };
    LocationViewComponent.prototype.addNewPlace = function () {
        if (this.selected != '') {
            this.willCreateNew = 'place';
        }
    };
    LocationViewComponent = __decorate([
        core_1.Component({
            selector: 'app-location-view',
            templateUrl: './location-view.component.html',
            styleUrls: ['./location-view.component.scss']
        })
    ], LocationViewComponent);
    return LocationViewComponent;
}());
exports.LocationViewComponent = LocationViewComponent;
