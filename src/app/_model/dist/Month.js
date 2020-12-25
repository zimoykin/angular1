"use strict";
exports.__esModule = true;
exports.Day = exports.Week = exports.Month = void 0;
//Calendar
var Month = /** @class */ (function () {
    function Month(title, year) {
        this.title = title;
        this.year = year;
        this.week = new Array();
    }
    return Month;
}());
exports.Month = Month;
var Week = /** @class */ (function () {
    function Week(week) {
        this.title = week;
        this.days = new Array();
    }
    return Week;
}());
exports.Week = Week;
var Day = /** @class */ (function () {
    function Day(day, isDayOff) {
        this.date = day;
        this.title = day.toLocaleDateString();
        this.isDayOff = isDayOff;
    }
    return Day;
}());
exports.Day = Day;
