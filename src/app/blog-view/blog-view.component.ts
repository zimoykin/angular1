import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Authorization } from '../_services/AuthrizationService'
import { HttpClient} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Constants as K } from '../_model/Constants'
import { BlogModel } from '../_model/BlogModel'

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
  
  constructor( private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  blogid$: Subject<string> = new BehaviorSubject ('')

  ngOnInit() {

    this.route.paramMap.subscribe ( (val) => {
      let blogid = val.get ('blogid')
      this.blogid$.next (blogid)
    })

  }

  ngOnDestroy () {
    this.blogid$.unsubscribe()
  }

}
