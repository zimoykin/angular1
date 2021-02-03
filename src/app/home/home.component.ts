import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants as K } from '../_model/Constants';
import { Authorization } from '../_services/AuthrizationService'
import {PageEvent} from '@angular/material/paginator';
import { Page } from '../_model/Pagination';
import { Http, Param } from '../_services/httpClient';
import { WebsocketService } from '../websocket.service';
import { UserPublic } from '../_model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 

export class HomeComponent implements OnInit {

  list$: Subject<[string]> = new BehaviorSubject ( undefined )
  isLoaded$: Subject<boolean> = new BehaviorSubject ( false )
  nextPage$: Subject<void> = new BehaviorSubject ( undefined )

  constructor( private httpClient: HttpClient, 
    private cookieService: CookieService,
    private ws: WebsocketService) { }

  auth = new Authorization(this.cookieService, this.httpClient)
  http = new Http(this.cookieService, this.httpClient)

  // MatPaginator Output
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageEvent: PageEvent;

  ws$: Subject<WebsocketService> = new BehaviorSubject ( undefined )
  online$: Subject<[UserPublic]> = new BehaviorSubject ( undefined )

  ngOnInit(): void {

    this.nextPage$.next()
    this.ws$.next ( this.ws )
   
    this.online$.subscribe( (obser) => {
      console.log(obser)
    })

    this.ws$.subscribe ( (obser) => {
      if ( obser.connected ) {
        this.ws.sendMessage('whoisonline?')
        this.ws.component = this
      }
      console.log(obser) 
    });

    this.nextPage$.subscribe ( ()  => {
      console.log ('currentPage: ' + this.pageIndex)
      this.isLoaded$.next(false)
      this.getAllBlogs()
    })
  }

  public pageChanged (event?:PageEvent) {
    this.pageIndex = event.pageIndex
    this.nextPage$.next()
    return event
  }
  

  getAllBlogs() {

      this.http.get <Page<string>> (`api/blogs/list`, 
        [
          new Param("page", (this.pageIndex+1).toString()),
          new Param('per', `${this.pageSize}`)
        ]
      ).then ( response => {
        console.log (response)
        this.isLoaded$.next( true )

        this.list$.next ( (<Page<string>>response.body).items )
        this.length = (<Page<string>>response.body).metadata.total

      })

    }

    ngOnDestroy () {
      this.isLoaded$.unsubscribe()
      this.list$.unsubscribe()
      this.nextPage$.unsubscribe()
    }

    isMobile() {
      return K.isMobile()
    }

}
