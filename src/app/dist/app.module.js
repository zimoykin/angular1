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
var menu_1 = require("@angular/material/menu");
var icon_1 = require("@angular/material/icon");
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
var tags_view_component_1 = require("./tags-view/tags-view.component");
var location_view_component_1 = require("./location-view/location-view.component");
var author_view_component_1 = require("./author-view/author-view.component");
var login_view_component_1 = require("./login-view/login-view.component");
require("./_services/date.extensions");
var place_view_component_1 = require("./place-view/place-view.component");
var paginator_1 = require("@angular/material/paginator");
var search_view_component_1 = require("./search-view/search-view.component");
var loader_view_component_1 = require("./loader-view/loader-view.component");
var place_view_short_component_1 = require("./place-view-short/place-view-short.component");
var emotion_view_component_1 = require("./emotion-view/emotion-view.component");
var core_2 = require("@agm/core");
var Constants_1 = require("../app/_model/Constants");
//https://www.design-seeds.com/in-nature/nature-made/nature-tones-40/
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
                footerview_component_1.FooterviewComponent,
                tags_view_component_1.TagsViewComponent,
                location_view_component_1.LocationViewComponent,
                author_view_component_1.AuthorViewComponent,
                login_view_component_1.LoginViewComponent,
                place_view_component_1.PlaceViewComponent,
                search_view_component_1.SearchViewComponent,
                loader_view_component_1.LoaderViewComponent,
                place_view_short_component_1.PlaceViewShortComponent,
                emotion_view_component_1.EmotionViewComponent
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
                select_1.MatSelectModule,
                menu_1.MatMenuModule,
                icon_1.MatIconModule,
                paginator_1.MatPaginatorModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: "" + Constants_1.Constants.google_key
                })
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
