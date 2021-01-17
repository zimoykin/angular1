"use strict";
exports.__esModule = true;
exports.ElemntMenu = exports.Constants = void 0;
var Constants = /** @class */ (function () {
    function Constants() {
    }
    //public static server: string = 'http://10.0.0.85:8000/'
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
        //console.log (document.getElementById('navbar').clientHeight / document.getElementById('backgroundImage').clientHeight  * 100)
        if (navigator.appVersion.toLocaleLowerCase().includes('android') || navigator.appVersion.toLocaleLowerCase().includes('ios')) {
            return true;
        }
        else {
            return (document.getElementById("backgroundImage").clientWidth < document.getElementById("backgroundImage").clientHeight);
        }
    };
    //public static server: string = 'http://10.0.0.102:8000/'
    Constants.server = 'http://10.0.1.7:8000/';
    Constants.imagePath = Constants.server + 'images/system/earth-globe.png';
    Constants.imageLike = Constants.server + 'images/system/like.png';
    Constants.imageDislike = Constants.server + 'images/system/dislike.png';
    Constants.imageReport = Constants.server + 'images/system/report.png';
    Constants.imageNoEmotion = Constants.server + 'images/system/noemotions.png';
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
