import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { blogComponent } from './blog/blog.component';
import { FormComponent } from './form/form.component';
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

@NgModule({
  declarations: [
    AppComponent,
    blogComponent,
    FormComponent,
    HeaderComponent,
    HomeComponent,
    BlogViewComponent,
    ContactViewComponent,
    UserViewComponent,
    EditPostViewComponent,
    BackgroundViewComponent,
    CalendarComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
