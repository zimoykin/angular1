import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
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
  
  blogObj?: BlogModel

  constructor( private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {

    const blogid = new Observable<string>(obser => {
      this.route.paramMap.subscribe((param) => {
        obser.next(param.get('blogid'))
      })
    }).subscribe( (val) => {
      console.log(val)
      if (this.auth.isJwtOk) {
          this.httpClient.get(`${K.server}api/posts/${val}`,{ headers: { Authorization: this.auth.token } }).subscribe ( (blogObject: BlogModel) => {

              console.log (blogObject)
              this.blogObj = blogObject

          })
      }
    })
  }

}
