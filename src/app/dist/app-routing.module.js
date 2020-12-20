"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var blog_view_component_1 = require("./blog-view/blog-view.component");
var edit_post_view_component_1 = require("./edit-post-view/edit-post-view.component");
var contact_view_component_1 = require("./contact-view/contact-view.component");
var user_view_component_1 = require("./user-view/user-view.component");
var routes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'blog/:blogid', component: blog_view_component_1.BlogViewComponent },
    { path: 'edit/:blogid', component: edit_post_view_component_1.EditPostViewComponent },
    { path: 'contact', component: contact_view_component_1.ContactViewComponent },
    { path: 'user/:userid', component: user_view_component_1.UserViewComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
