import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants as K } from '../_model/Constants';
import { Authorization } from '../_services/AuthrizationService'
import { BlogModel } from '../_model/BlogModel'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 

export class HomeComponent implements OnInit {

  list: BlogModel[] = []
  isLoaded: boolean = false
  backElement = null

  constructor( private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {

    this.getAllBlogs().subscribe(
      response => {
        this.isLoaded = true
        response.map((post: BlogModel) => {
          this.list.push( post );
        })

      }
    )
    
    this.backElement = document.getElementById('background') as HTMLElement;
  }

  getAllBlogs() : Observable <[BlogModel]> {

    return new Observable<[BlogModel]>(obser => {

      if (this.auth.token == '' || this.auth.token == null) {
        throw console.error('error');
      }

      this.httpClient.get(`${K.server}api/blogs`, {
        headers: { Authorization: this.auth.token }
      }).subscribe((blogs: [BlogModel]) => {
        obser.next(blogs)
      })
    })
  }

}
