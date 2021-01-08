import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  list$: Subject<[string]> = new BehaviorSubject ( undefined )
  isLoaded$: Subject<boolean> = new BehaviorSubject ( false )

  constructor( private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {
    this.getAllBlogs()
  }

  getAllBlogs() {

      if (this.auth.token == '' || this.auth.token == null) {
        throw console.error('error');
      }

      this.httpClient.get(`${K.server}api/blogs/list`, {
        headers: this.auth.jwtHeader()
      }).subscribe( (blogs: [string]) => {

        this.isLoaded$.next( true )
        this.list$.next (blogs)

      })
    }

    ngOnDestroy () {
      this.isLoaded$.unsubscribe()
      this.list$.unsubscribe()
    }

}
