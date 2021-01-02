import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogModel } from '../_model/BlogModel';
import { Constants as K } from '../_model/Constants'
import { Authorization } from '../_services/AuthrizationService';


@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  list: BlogModel[] = []
  isLoaded: boolean = false
  tag: string


  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.httpClient.get<BlogModel[]>(`${K.server}api/search/tag/${param.get('tag')}`, { headers: { Authorization: this.auth.token } })
        .subscribe(val => { 
          this.list = val
          this.isLoaded = true
        })
    })
  }

}