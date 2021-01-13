"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CalendarComponent = void 0;
var core_1 = require("@angular/core");
var Month_1 = require("../_model/Month");
var Constants_1 = require("../_model/Constants");
var AuthrizationService_1 = require("../_services/AuthrizationService");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(http, cookie) {
        this.http = http;
        this.cookie = cookie;
        this.$dt = new Date();
        this.auth = new AuthrizationService_1.Authorization(this.cookie, this.http);
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.GetBuildThisMonth();
    };
    CalendarComponent.prototype.nextMonth = function (month) {
        this.$dt.setMonth(this.$dt.getMonth() + month);
        this.GetBuildThisMonth();
    };
    CalendarComponent.prototype.chooseDay = function (date) {
        console.log(date);
        this.getBlogsOnDay(date);
    };
    CalendarComponent.prototype.getBlogsOnDay = function (date) {
        var _this = this;
        this.http.get(Constants_1.Constants.server + "api/blogs/onday/" + date.prepareDateConvertToString(), {
            headers: {
                Authorization: this.auth.token
            }
        })
            .subscribe(function (blogs) {
            _this.blogs = blogs;
        });
    };
    CalendarComponent.prototype.GetBuildThisMonth = function () {
        var _month = this.$dt.toLocaleDateString('en', { month: 'long' });
        var _year = this.$dt.getFullYear().toString();
        var startOfMonth = new Date(this.$dt.getFullYear(), this.$dt.getMonth(), 1);
        var endOfMonth = new Date(this.$dt.getFullYear(), this.$dt.getMonth() + 1, 0);
        this.month = new Month_1.Month(_month, _year);
        //add day before and first week
        console.log(0 - startOfMonth.getDay());
        var week = new Month_1.Week('1');
        for (var dayBefore = (0 - startOfMonth.getDay() + (startOfMonth.getDay() == 0 ? -6 : 1)); dayBefore < 0; dayBefore++) {
            var curDay = new Date(startOfMonth.getTime() + (86400 * 1000 * dayBefore));
            console.log(curDay);
            week.days.push(new Month_1.Day(curDay, curDay.getDay() == 0 || curDay.getDay() == 6 ? true : false));
        }
        week.days.sort(function (a, b) {
            if (a.date > b.date) {
                return 1;
            }
            if (a.date < b.date) {
                return -1;
            }
        });
        for (var dayofWeek = 0; week.days.length < 7; dayofWeek++) {
            var curDay = new Date(startOfMonth.getTime() + (86400 * 1000 * dayofWeek));
            week.days.push(new Month_1.Day(curDay, curDay.getDay() == 0 || curDay.getDay() == 6 ? true : false));
            console.log(week);
        }
        // next week
        var lastDayOfWeek = week.days[week.days.length - 1].date;
        console.log(lastDayOfWeek);
        this.month.week.push(week);
        for (var numberWeek = 2; numberWeek < 7; numberWeek++) {
            var week_1 = new Month_1.Week(numberWeek.toString());
            var firstDayWeek = new Date(lastDayOfWeek.getTime() + 86400 * 1000);
            if (firstDayWeek.getMonth() == startOfMonth.getMonth()) {
                for (var dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
                    var curDay = new Date(lastDayOfWeek.getTime() + (86400 * 1000 * dayOfWeek));
                    week_1.days.push(new Month_1.Day(curDay, curDay.getDay() == 0 || curDay.getDay() == 6 ? true : false));
                    console.log(week_1);
                }
                lastDayOfWeek = week_1.days[week_1.days.length - 1].date;
                console.log(lastDayOfWeek);
                week_1.days.sort(function (a, b) {
                    if (a.date > b.date) {
                        return 1;
                    }
                    if (a.date < b.date) {
                        return -1;
                    }
                });
                this.month.week.push(week_1);
            }
        }
    };
    CalendarComponent.prototype.isMobile = function () {
        return Constants_1.Constants.isMobile();
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'app-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.scss']
        })
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
