import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogModel } from '../_model/BlogModel';
import { Constants as K } from '../_model/Constants'
import { Page } from '../_model/Pagination';
import { Http, Param } from '../_services/http-service.service';


@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: Http) { }

  list: Subject<[string]> = new BehaviorSubject<[string]>(['']);
  isLoaded: boolean = false
  tag: string
  nextPage$: Subject<void> = new BehaviorSubject(undefined)
  // MatPaginator Output
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageEvent: PageEvent;

  public pageChanged(event?: PageEvent) {
    this.pageIndex = event.pageIndex
    this.nextPage$.next()
    return event
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {

      this.nextPage$.next()

      this.nextPage$.subscribe(() => {
        this.httpClient.get<Page<string>>("api/search/tag", [new Param('tag', param.get('tag'))])
          .then(response => {
            this.list.next(response.body.items)
            this.isLoaded = true
          })
          .finally(() => {
            this.isLoaded = true
          })

      })
    })
  }

  isMobile() {
    return K.isMobile()
  }

}