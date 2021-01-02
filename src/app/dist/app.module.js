"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var blog_component_1 = require("./blog/blog.component");
var header_component_1 = require("./header/header.component");
var angular_bootstrap_md_1 = require("angular-bootstrap-md");
var http_1 = require("@angular/common/http");
var home_component_1 = require("./home/home.component");
var blog_view_component_1 = require("./blog-view/blog-view.component");
var contact_view_component_1 = require("./contact-view/contact-view.component");
var user_view_component_1 = require("./user-view/user-view.component");
var edit_post_view_component_1 = require("./edit-post-view/edit-post-view.component");
var background_view_component_1 = require("./background-view/background-view.component");
var calendar_component_1 = require("./calendar/calendar.component");
var forms_1 = require("@angular/forms");
var autocomplete_1 = require("@angular/material/autocomplete");
var input_1 = require("@angular/material/input");
var animations_1 = require("@angular/platform-browser/animations");
var select_1 = require("@angular/material/select/");
var upload_image_view_component_1 = require("./upload-image-view/upload-image-view.component");
var footerview_component_1 = require("./footerview/footerview.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                blog_component_1.blogComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                blog_view_component_1.BlogViewComponent,
                contact_view_component_1.ContactViewComponent,
                user_view_component_1.UserViewComponent,
                edit_post_view_component_1.EditPostViewComponent,
                background_view_component_1.BackgroundViewComponent,
                calendar_component_1.CalendarComponent,
                upload_image_view_component_1.UploadImageViewComponent,
                footerview_component_1.FooterviewComponent
            ],
            imports: [
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                input_1.MatInputModule,
                autocomplete_1.MatAutocompleteModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                select_1.MatSelectModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
