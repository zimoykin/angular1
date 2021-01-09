import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants as K } from '../_model/Constants';
import { Authorization } from '../_services/AuthrizationService'
import {PageEvent} from '@angular/material/paginator';
import { Page } from '../_model/Pagination';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 

export class HomeComponent implements OnInit {

  list$: Subject<[string]> = new BehaviorSubject ( undefined )
  isLoaded$: Subject<boolean> = new BehaviorSubject ( false )

  nextPage$: Subject<void> = new BehaviorSubject ( undefined )

  constructor( private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  // MatPaginator Output
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent;

  ngOnInit(): void {

    this.nextPage$.next()

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

      console.log ('getAllBlogs')
      if (this.auth.token == '' || this.auth.token == null) {
        throw console.error('error');
      }

      this.httpClient.get(`${K.server}api/blogs/list?page=${this.pageIndex+1}&per=${this.pageSize}`, {
        observe: 'response',
        headers: this.auth.jwtHeader()
      }).subscribe ( response => {

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

}
