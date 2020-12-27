import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BlogDraft, BlogModel } from '../_model/BlogModel'
import { Authorization } from '../_services/AuthrizationService' 
import { Constants as K } from '../_model/Constants'

@Component({
  selector: 'app-edit-post-view',
  templateUrl: './edit-post-view.component.html',
  styleUrls: ['./edit-post-view.component.scss']
})
export class EditPostViewComponent implements OnInit {

  blogObj?: BlogModel  

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {

    const blogid = new Observable<string>(obser => {
      this.route.paramMap.subscribe((param) => {
        obser.next(param.get('blogid'))
      })
    }).subscribe( (val) => {
      if (val != 'new') {
        if (this.auth.isJwtOk) {
          this.httpClient.get(`${K.server}api/posts/${val}`, { headers: { Authorization: this.auth.token } })
          .subscribe((blogObject: BlogModel) => {
            console.log(blogObject)
            this.blogObj = blogObject
          })
        }
      } //
      else {
        console.log ('111')
        if ( localStorage.getItem('blog') ) {
            let draft = JSON.parse( localStorage.getItem('blog') ) as BlogDraft
            let title = document.getElementById('title') as HTMLInputElement
            title.value = draft.title
            let description = document.getElementById('description') as HTMLInputElement
            description.value = draft.description
            let place = document.getElementById('place') as HTMLInputElement
            place.value = draft.place
            let tags = document.getElementById('tags') as HTMLInputElement
            tags.value = draft.tags
        }
      }
    })


  }

  getTags () : string {
    return '#' + this.blogObj.tags.join(' #')
  }

  clear () {
    let title = document.getElementById('title') as HTMLInputElement
    title.value = ''
    let description = document.getElementById('description') as HTMLInputElement
    description.value = ''
    let place = document.getElementById('place') as HTMLInputElement
    place.value = ''
    let tags = document.getElementById('tags') as HTMLInputElement
    tags.value = ''
  }

  save ( title:string, description:string, place:string, tags:string ) {
   
    if (this.blogObj != null ) {
      console.log('update here')
      this.httpClient.put(`${K.server}api/posts/${this.blogObj.id}`, { title: title,
         description:description, place: place, tags: tags}, { headers: { Authrization: this.auth.token}}
      ).subscribe ( () => {
        window.location.href = '\home'
      })

    } else {
      console.log('create here')
      this.httpClient.post(`${K.server}api/posts/`, { title: title,
        description:description, place: place, tags: tags}, { headers: { Authrization: this.auth.token}}
      ).subscribe ( () => {
        window.location.href = '\home'
      })
    }

  }

  draft (title:string, description:string, place:string, tags:string) {
    console.log (title)
    localStorage.setItem("blog", JSON.stringify({
      title: title, 
      description: description,
      place: place,
      tags: tags
    }))
  }

}
