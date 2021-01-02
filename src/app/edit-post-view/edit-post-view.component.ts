import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BlogDraft, BlogModel, Place } from '../_model/BlogModel'
import { Authorization } from '../_services/AuthrizationService'
import { Constants as K } from '../_model/Constants'

@Component({
  selector: 'app-edit-post-view',
  templateUrl: './edit-post-view.component.html',
  styleUrls: ['./edit-post-view.component.scss']
})
export class EditPostViewComponent implements OnInit {

  blogObj?: BlogModel
  isRequestSend: boolean
  placeid:string
  public file: any 

  myControl = new FormControl()
  places: Place[]
  filteredPlaces: Observable<Place[]>
  selected: string

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {

    this.$getPlaces('').subscribe((places) => {
      console.log(places)
      this.isRequestSend = false
      this.places = places

      this.filteredPlaces = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    })

    const blogid = new Observable<string>(obser => {
      this.route.paramMap.subscribe((param) => {
        obser.next(param.get('blogid'))
      })
    }).subscribe((val) => {
      if (val != 'new') {
        if (this.auth.isJwtOk) {
          this.httpClient.get<BlogModel>(`${K.server}api/blogs/${val}`,
            {
              headers:
                { Authorization: this.auth.token }
            })
            .subscribe((blogObject: BlogModel) => {
              console.log(blogObject)
              this.blogObj = blogObject;
              (<HTMLInputElement>document.getElementById('place')).value = blogObject.place.title
              this.placeid = blogObject.place.id
            })
        }
      } //
      else {
        console.log('111')
        if (localStorage.getItem('blog')) {
          let draft = JSON.parse(localStorage.getItem('blog')) as BlogDraft
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

  getTags(): string { return '#' + this.blogObj.tags.join(' #') }

  clear() {
    let title = document.getElementById('title') as HTMLInputElement
    title.value = ''
    let description = document.getElementById('description') as HTMLInputElement
    description.value = ''
    let place = document.getElementById('place') as HTMLInputElement
    place.value = ''
    let tags = document.getElementById('tags') as HTMLInputElement
    tags.value = ''
  }

  save(title: string, description: string, tags: string) {

    const headers = new HttpHeaders({
      'Authorization': this.auth.token,
      'Content-Type': 'application/json'
    })

    console.log(this.file)

    if (this.blogObj != null) {

      console.log('update here')
      console.log (this.file)

      this.httpClient.put<BlogModel>(`${K.server}api/blogs/${this.blogObj.id}`,
        JSON.stringify({
          title: title, description: description, placeId: this.placeid, tags: tags
        }),
        { headers: headers })
        .subscribe((blog) => {
          if (blog != undefined && this.file != undefined) {
            console.log(blog)
            this.clear()

            //u-p-l-o-a-d-s"
            // const formData: FormData = new FormData();
            // formData.append('file', this.file, this.file.fileName);
            const data = new FormData()
            data.append('file', this.file)
            this.httpClient.post<BlogModel>(`${K.server}api/blogs/uploads/${this.blogObj.id}`, 
            data, 
             {headers: new HttpHeaders({
              'Authorization': this.auth.token
            })}).subscribe(
                (val) => {
                  console.log (val)
                }
            )

           // window.location.href = '\home'
          }
        })

    } else {

      this.httpClient.request<BlogModel>(new HttpRequest('POST', `${K.server}api/blogs/`,
        JSON.stringify({
          title: title, description: description, placeId: this.placeid, tags: tags
        })
        , { headers: headers }))
        .subscribe((blog) => {
          if (blog != undefined) {
            console.log(blog)
            this.clear()
            window.location.href = '\home'
          }
        })
    }
  }

  private 
  _filter(value: string): Place[] {
    console.log(value)
    return this.places.filter((val) => {
      return val.title.toLowerCase().includes(value.toLowerCase())
    }
    )
  }

  draft(title: string, description: string, place: string, tags: string) {
    console.log(title)
    localStorage.setItem("blog", JSON.stringify({
      title: title,
      description: description,
      place: place,
      tags: tags
    }))
  }

  selectedPlace($event: string) {
    console.log ( $event )
    this.placeid = ''

    let filtred = this.places.filter ( val => {
      return val.title === $event
    })


    if ( filtred.length > 0 ) {
      this.placeid = filtred[0].id
    }

  }

  $getPlaces(title: string): Observable<Place[]> {
    console.log('request send: ' + title)

    if (title != '') {

      return this.httpClient.get<[Place]>(`${K.server}api/places/title/${title}`,
        { headers: new HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) })

    } else {

      return this.httpClient.get<[Place]>(`${K.server}api/places/`,
        { headers: new HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) })

    }

  }

  /////



}