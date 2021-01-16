import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Authorization } from '../_services/AuthrizationService'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Constants as K } from '../_model/Constants'
import { BlogModel } from '../_model/BlogModel'
import { Http, Param } from '../_services/httpClient'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService) { }
  auth = new Authorization(this.cookieService, this.httpClient)
  http = new Http(this.cookieService, this.httpClient)

  blog$: Subject<BlogModel> = new BehaviorSubject(undefined)
  blogid: string
  imageList$: Subject<[string]> = new BehaviorSubject([''])
  isLoaded$: Subject<boolean> = new BehaviorSubject(false)
  userID: Observable<string>


  ngOnInit() {

    this.userID = new Observable<string>((obser) => {
      console.log(localStorage.getItem('user_id'))
      obser.next(localStorage.getItem('user_id'))
    })

    this.route.paramMap.subscribe((val) => {
      this.blogid = val.get('blogid')

      this.http.get<BlogModel>(`${K.server}api/blogs/id`,
        [
          new Param('blogid', this.blogid)
        ]
      ).then((response) => {
        this.blog$.next(response.body)
        this.isLoaded$.next(true)
        this.getImages()
      })
        .finally(() => { this.isLoaded$.next(true) })
    })

  }

  ngOnDestroy() {
    this.blog$.unsubscribe()
    this.isLoaded$.unsubscribe()
  }

  getImageSize(): string {
    if (K.isMobile()) {
      return document.getElementById('mainWindow').clientWidth + "px"
    } else {
      return (document.getElementById('mainWindow').clientWidth/4)*3 + "px"
    }
  }
  getImageSizePreview(): string {
    if (this.isMobile()) {
      return document.getElementById('mainWindow').clientWidth/6 + "px"
    } else {
      return (document.getElementById('mainWindow').clientWidth/4) + "px"
    }
  }

  getHeightMainPictures() {
    if (this.isMobile()) {
      return document.getElementById('mainPictures').clientHeight/6 + "px"
    } else {
      return document.getElementById('mainPictures').clientHeight + "px"
    }
  }

  clickPictures() { }

  getImages () {

    this.http.get<[string]>(`${K.server}api/blogs/images/list`, 
    [
      new Param('blogid',  this.blogid )
    ])
    .then ( (response) => {
      console.log (response)
      this.imageList$.next (response.body)
    })
  }

  isMobile() {
    return K.isMobile()
  }

}