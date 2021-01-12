import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BlogModel } from '../_model/BlogModel';
import { Authorization } from '../_services/AuthrizationService';
import { Constants as K } from '../_model/Constants'
import { Page } from '../_model/Pagination';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {


  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  list: String[] = []
  isLoaded: boolean = false
  tag: string


  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.httpClient.get <Page<String>> (`${K.server}api/search/blogs?value=${param.get('value')}`, 
      { headers: this.auth.jwtHeader() })
        .subscribe(val => { 
          this.list = val.items
          this.isLoaded = true
        })
    })
  }

}
