import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { blogComponent } from './blogcomponents/Blog/blog.component';
import { HeaderComponent } from './header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BlogViewComponent } from './blogcomponents/blog-view/blog-view.component';
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
import { TagsViewComponent } from './blogcomponents/tags-view/tags-view.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import './_services/date.extensions';
import { PlaceViewComponent } from './place-view/place-view.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchViewComponent } from './search-view/search-view.component';
import { LoaderViewComponent } from './loader-view/loader-view.component';
import { PlaceViewShortComponent } from './place-view-short/place-view-short.component';
import { EmotionViewComponent } from './blogcomponents/emotion-view/emotion-view.component';
import { AgmCoreModule } from '@agm/core';
import { MessageViewComponent } from './Message/message-view/message-view.component';
import { MessageViewShortComponent } from './Message/message-view-short/message-view-short.component';
import { WriteMessageComponent } from './Message/write-message/write-message.component';
import { BlogtitleComponent } from './blogtitle/blogtitle.component';



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
    LoginViewComponent,
    PlaceViewComponent,
    SearchViewComponent,
    LoaderViewComponent,
    PlaceViewShortComponent,
    EmotionViewComponent,
    MessageViewComponent,
    MessageViewShortComponent,
    WriteMessageComponent,
    BlogtitleComponent
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
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: ``
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
