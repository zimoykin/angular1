import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { Constants as K } from '../../Model/Constants'


export interface Blog {
  title: string
  description: string
  imagesrc: string
  id: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  list: Blog[] = []

  constructor ( private httpClient: HttpClient, private cookieService: CookieService ) { }


  ngOnInit(): void {

    this.getAllBlog().subscribe (
      response => {
          response.map ( post => {
              this.list.push ({ title: post.title, 
                description: post.description,
                imagesrc: post.image,
                id: post.id })
          })
  
       }
    )

  }

  getAllBlog(): Observable<any> {

    let accessToken = this.cookieService.get('jwt')

    if (accessToken == null || accessToken == '') {
      return
    }

    const token = `Bearer ${accessToken}`

    return this.httpClient.get(`${K.server}/api/posts`, {
      headers: {
        'Authorization': token
      }
    })
  }

}
