import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { blogComponent } from './blog/blog.component';
import { HeaderComponent } from './header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { EditPostViewComponent } from './edit-post-view/edit-post-view.component';
import { BackgroundViewComponent } from './background-view/background-view.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule} from '@angular/material/select/';
import { UploadImageViewComponent } from './upload-image-view/upload-image-view.component';
import { FooterviewComponent } from './footerview/footerview.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { LoginViewComponent } from './login-view/login-view.component';


//https://www.design-seeds.com/in-nature/nature-made/nature-tones-40/

@NgModule({
  declarations: [
    AppComponent,
    blogComponent,
    HeaderComponent,
    HomeComponent,
    BlogViewComponent,
    ContactViewComponent,
    UserViewComponent,
    EditPostViewComponent,
    BackgroundViewComponent,
    CalendarComponent,
    UploadImageViewComponent,
    FooterviewComponent,
    TagsViewComponent,
    LocationViewComponent,
    AuthorViewComponent,
    LoginViewComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
