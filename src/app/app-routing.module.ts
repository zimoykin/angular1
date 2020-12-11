import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BlogViewComponent } from './blog-view/blog-view.component'
import { blogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'Blog', component: blogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
