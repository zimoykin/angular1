"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocationViewComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Constants_1 = require("../_model/Constants");
var operators_1 = require("rxjs/operators");
var http_service_service_1 = require("../_services/http-service.service");
var LocationViewComponent = /** @class */ (function () {
    function LocationViewComponent(http) {
        this.http = http;
        this.myControl = new forms_1.FormControl();
        this.selected = "";
        this.willCreateNew = "";
        this.load = false;
    }
    LocationViewComponent.prototype.ngOnInit = function () {
        this.load = true;
        //api/countries/list
        this.updateCountryList();
    };
    LocationViewComponent.prototype.updateCountryList = function () {
        var _this = this;
        this.$getCountriesList()
            .then(function (val) {
            _this.countries = val;
            _this.load = false;
            _this.filtred = _this.myControl.valueChanges.pipe(operators_1.startWith(""), operators_1.map(function (value) { return _this._filter(value); }));
        })["catch"](function (error) {
            alert(error);
        });
    };
    LocationViewComponent.prototype.selectedCountry = function (title) {
        if (title == undefined) {
            this.selected = "";
            this.places = undefined;
            return;
        }
        if (this.selected == title) {
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
            console.log("country not found");
            this.selected = "";
            this.places = undefined;
        }
    };
    LocationViewComponent.prototype.updatePlaceList = function () {
        var _this = this;
        this.places = undefined;
        if (this.selected == "") {
            return;
        }
        this.http
            .get("api/places/search", [
            new http_service_service_1.Param("field", "country_id"),
            new http_service_service_1.Param("value", this.selected),
        ])
            .then(function (val) {
            console.log(val);
            _this.places = val.body;
        });
    };
    LocationViewComponent.prototype.$getCountriesList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get("api/countries/list", [])
                .then(function (response) {
                resolve(response.body);
            })["catch"](function () {
                _this.load = false;
                console.log("catch");
            })["finally"](function () {
                _this.load = false;
                console.log("finally");
            });
        });
    };
    LocationViewComponent.prototype.clear = function () {
        this.selected = "";
        this.places = undefined;
        document.getElementById("country").value = "";
        this.updateCountryList();
        return;
    };
    LocationViewComponent.prototype._filter = function (value) {
        return this.countries.filter(function (val) {
            return val.title.toLowerCase().includes(value.toLowerCase());
        });
    };
    LocationViewComponent.prototype.addNewCountry = function () {
        this.willCreateNew = "country";
        this.selected = "";
        document.getElementById("country").value = "";
    };
    //C R E A T E
    LocationViewComponent.prototype.saveCountryPlace = function (val, title, description, longitude, latitude) {
        var _this = this;
        if (this.willCreateNew == "place") {
            if (val && this.selected != "") {
                this.http
                    .post("api/places/", JSON.stringify({
                    title: title,
                    description: description,
                    longitude: parseFloat(longitude),
                    latitude: parseFloat(latitude),
                    countryId: this.selected
                }))
                    .then(function (val) {
                    _this.willCreateNew = "";
                    _this.places = undefined;
                    _this.updateCountryList();
                    _this.updatePlaceList();
                });
            }
            else {
                this.willCreateNew = "";
            }
        }
        else if (this.willCreateNew == "country") {
            console.log("create country!");
            if (val) {
                this.http
                    .post("api/countries/", JSON.stringify({ title: title, description: description })).then(function (val) {
                    _this.willCreateNew = "";
                    _this.updateCountryList();
                });
            }
            else {
                this.willCreateNew = "";
                this.willCreateNew = this.willCreateNew;
            }
        }
        else {
            this.willCreateNew = "";
        }
    };
    LocationViewComponent.prototype.addNewPlace = function () {
        if (this.selected != "") {
            this.willCreateNew = "place";
        }
    };
    LocationViewComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    LocationViewComponent = __decorate([
        core_1.Component({
            selector: "app-location-view",
            templateUrl: "./location-view.component.html",
            styleUrls: ["./location-view.component.scss"]
        })
    ], LocationViewComponent);
    return LocationViewComponent;
}());
exports.LocationViewComponent = LocationViewComponent;
