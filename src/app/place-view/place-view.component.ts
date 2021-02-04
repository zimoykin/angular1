import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlaceFull } from '../_model/BlogModel';
import { Constants as K } from '../_model/Constants'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Http } from '../_services/http-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss']
})
export class PlaceViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: Http) { }
  place: PlaceFull
  imagePreview$ : Subject<string> = new BehaviorSubject(`${environment.server}images/system/world-map.png`);

  ngOnInit(): void {
    this.route.paramMap.subscribe ( val => {
      let placeid = val.get('placeid')
      this.getPlace (placeid)
    })
  }

  ngOnDestroy() {
    this.imagePreview$.unsubscribe()
  }


  private getPlace(placeid: string) {

    this.http.get<PlaceFull> (`api/places/full?placeid=${placeid}`)
    .then ( (val) => {
      this.place = val.body
      if (val!=undefined && val.body.blogs.length > 0) {
        this.imagePreview$.next(val.body.blogs[this.random(val.body.blogs.length-1)].image)
      }
    })

  }

  random(val:number) : number {
    return Math.floor(Math.random() * (val - 0 + 1) + 0);
  }

  getWidthPreview () : string {
    return '200px'
  }

}
