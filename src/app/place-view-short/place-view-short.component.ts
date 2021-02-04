import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogModel, Place } from '../_model/BlogModel';
import { Constants as K } from '../_model/Constants'
import { Http, Param } from '../_services/http-service.service';

@Component({
  selector: 'app-place-view-short',
  templateUrl: './place-view-short.component.html',
  styleUrls: ['./place-view-short.component.scss']
})
export class PlaceViewShortComponent implements OnInit {

  @Input() place: Place
  isload: false
  imagePreview$ : Subject<string> = new BehaviorSubject(`${environment.server}images/system/world-map.png`);


  constructor(private http: Http) { }

  ngOnInit() : void {
    if ( this.place.image != undefined ) {
      this.imagePreview$.next (this.place.image[0])
    }
  }

  async getPictureSize () : Promise<string> {
    return new Promise<string> ( response => {
      response('480')
    })
  }

}
