import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlaceFull } from '../_model/BlogModel';
import { Authorization } from '../_services/AuthrizationService';
import { Constants as K } from '../_model/Constants'
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-place-view',
  templateUrl: './place-view.component.html',
  styleUrls: ['./place-view.component.scss']
})
export class PlaceViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cookie: CookieService, private http: HttpClient) { }
  place: PlaceFull
  auth = new Authorization(this.cookie, this.http)
  imagePreview$ : Subject<string> = new BehaviorSubject(`${K.server}images/system/world-map.png`);

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

    this.http.get<PlaceFull> (`${K.server}api/places/full?placeid=${placeid}`, {
      headers: { Authorization: this.auth.token }
    } ).subscribe ( val => {
      this.place = val
      if (val!=undefined && val.blogs.length > 0) {
        this.imagePreview$.next(val.blogs[this.random(val.blogs.length-1)].image)
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
