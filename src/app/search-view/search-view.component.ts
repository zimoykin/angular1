import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants as K } from '../_model/Constants'
import { Page } from '../_model/Pagination';
import { Http, Param } from '../_services/http-service.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private http: Http, 
  ) { }


  list: String[] = []
  isLoaded: boolean = false
  tag: string

  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      this.http.get <Page<String>> (
        `api/search/blogs}`, 
         [new Param('value', param.get('value'))] 
      ).then ( (val) => {
        this.list = val.body.items
        this.isLoaded = true
      })        
    })

  }

}
