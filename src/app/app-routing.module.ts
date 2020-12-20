import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BlogViewComponent } from './blog-view/blog-view.component'
import { EditPostViewComponent as editView } from './edit-post-view/edit-post-view.component'
import { ContactViewComponent } from './contact-view/contact-view.component'
import { UserViewComponent as userView } from './user-view/user-view.component'
import { Extension } from '@material-ui/icons';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog/:blogid', component: BlogViewComponent },
  { path: 'edit/:blogid', component: editView },
  { path: 'contact', component: ContactViewComponent },
  { path: 'user/:userid', component: userView },
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }