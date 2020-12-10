import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants as K } from '../../Model/Constants';
import { Authorization } from '../_services/AuthrizationService'
import { BlogModel } from '../../Model/BlogModel'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  list: BlogModel[] = [];

  constructor( private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {

    this.getAllBlogs().subscribe (
      response => {
          response.map ( (post: BlogModel) => {
              this.list.push ({ title: post.title,
                description: post.description,
                image: post.image,
                id: post.id });
          });

       }
    );

  }

  getAllBlogs() : Observable <[BlogModel]> {

    const blogs = new Observable<[BlogModel]>(obser => {

      if (this.auth.isJwtOk()) {
        console.log (`get jwt${this.auth.token}`)

        if ( this.auth.token == '' || this.auth.token == null ) {
          throw console.error('error');
        }

        this.httpClient.get(`${K.server}api/posts`, {
          headers: { Authorization: this.auth.token }
        }).subscribe ( (blogs: [BlogModel]) => {
          obser.next (blogs)
        })
      } else {
        console.log (`jwt isn't yet ok`)
      }

    })

    return blogs

  }

}
