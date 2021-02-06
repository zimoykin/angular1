"use strict";
exports.__esModule = true;
exports.ElemntMenu = exports.Constants = void 0;
var environment_1 = require("src/environments/environment");
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.defaultMenu = function () {
        var menus = new Array();
        menus.push(new ElemntMenu('home', '/home'));
        menus.push(new ElemntMenu('new blog', '/edit/new'));
        menus.push(new ElemntMenu('calendar', '/calendar'));
        menus.push(new ElemntMenu('contacts', '/contacts'));
        menus.push(new ElemntMenu('location', '/location'));
        return menus;
    };
    Constants.isMobile = function () {
        if (navigator.appVersion.toLocaleLowerCase().includes('android') || navigator.appVersion.toLocaleLowerCase().includes('ios')) {
            return true;
        }
        else {
            return (document.getElementById("backgroundImage").clientWidth < document.getElementById("backgroundImage").clientHeight);
        }
    };
    Constants.imagePath = environment_1.environment.server + 'images/system/earth-globe.png';
    Constants.imageLike = environment_1.environment.server + 'images/system/like.png';
    Constants.imageDislike = environment_1.environment.server + 'images/system/dislike.png';
    Constants.imageReport = environment_1.environment.server + 'images/system/report.png';
    Constants.imageNoEmotion = environment_1.environment.server + 'images/system/noemotions.png';
    return Constants;
}());
exports.Constants = Constants;
var ElemntMenu = /** @class */ (function () {
    function ElemntMenu(title, route) {
        this.title = title;
        this.route = route;
    }
    return ElemntMenu;
}());
exports.ElemntMenu = ElemntMenu;
