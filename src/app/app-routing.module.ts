import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BlogViewComponent } from './blogcomponents/blog-view/blog-view.component'
import { EditPostViewComponent as editView } from './edit-post-view/edit-post-view.component'
import { ContactViewComponent } from './contact-view/contact-view.component'
import { UserViewComponent as userView } from './user-view/user-view.component'
import { CalendarComponent } from '../app/calendar/calendar.component'
import { LocationViewComponent } from '../app/location-view/location-view.component'
import { TagsViewComponent } from './blogcomponents/tags-view/tags-view.component'
import { AuthorViewComponent } from '../app/author-view/author-view.component'
import { LoginViewComponent } from './login-view/login-view.component';
import { PlaceViewComponent } from './place-view/place-view.component';
import { SearchViewComponent } from './search-view/search-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog/:blogid', component: BlogViewComponent },
  { path: 'edit/:blogid', component: editView },
  { path: 'contacts', component: ContactViewComponent },
  { path: 'user/:userid', component: userView },
  { path: 'calendar', component: CalendarComponent },
  { path: 'location', component: LocationViewComponent },
  { path: 'places/:placeid', component: PlaceViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'tag/:tag', component: TagsViewComponent },
  { path: 'search/:value', component: SearchViewComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }