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
  
  blogObj: BlogModel

  constructor( private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService ) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {
    const blogid = new Observable<string>(obser => {
      this.route.paramMap.subscribe((param) => {
        obser.next(param.get('blogid'))
      })
    }).subscribe( (val) => {
      if (this.auth.isJwtOk) {
          this.getBlog(val).subscribe ((blog: BlogModel) => {
            this.blogObj = blog
        })
      }
    })
  }

  getBlog(blogid: string) : Observable <BlogModel> {

    return new Observable<BlogModel>(obser => {

      if (this.auth.token == '' || this.auth.token == null) {
        throw console.error('error');
      }

      this.httpClient.get(`${K.server}api/blogs/id?blogid=${blogid}`, {
        headers: { Authorization: this.auth.token }
      }).subscribe((blogs: BlogModel) => {
        obser.next(blogs)
      })
    })
  }

}
