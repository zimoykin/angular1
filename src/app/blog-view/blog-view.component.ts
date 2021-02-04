import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Constants as K } from '../_model/Constants'
import { BlogModel } from '../_model/BlogModel'
import { Http, Param } from '../_services/http-service.service'
import { map } from 'rxjs/operators'
import { WebsocketService } from '../_services/websocket.service'
import { UserPublic } from '../_model/User'

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private httpClient: Http,
    private ws: WebsocketService) { }

  blog$: Subject<BlogModel> = new BehaviorSubject(undefined)
  blogid: string
  imageList$: Subject<[string]> = new BehaviorSubject([''])
  isLoaded$: Subject<boolean> = new BehaviorSubject(false)
  userID: Observable<string>
  onlineUsers: [UserPublic]


  ngOnInit() {

    this.userID = new Observable<string>((obser) => {
      console.log(localStorage.getItem('user_id'))
      obser.next(localStorage.getItem('user_id'))
    })

    this.ws.online$.subscribe ( (obser) => {
      if (obser != undefined) {
        this.onlineUsers = obser
      }
    });

    this.route.paramMap.subscribe((val) => {
      this.blogid = val.get('blogid')

      this.httpClient.get<BlogModel>(`api/blogs/id`,
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

  clickPictures (item: string) { 
    (<HTMLImageElement>document.getElementById('mainPictures')).src = item
  }

  getImages () {

    this.httpClient.get<[string]>(`api/blogs/images/list`, 
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


  userOnline (userid: string) : boolean {
    console.log('is online? ' + userid) 
    return this.onlineUsers.filter( (val) => {
      return val.id == userid
    }).length > 0
  }

}