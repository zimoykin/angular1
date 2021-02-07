import { Component, OnInit } from '@angular/core';
import { User, UserFullInfo, UserPublic } from '../_model/User';
import { Constants as K } from '../_model/Constants'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Http } from '../_services/http-service.service';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private http: Http,
    private ws: WebsocketService
    ) { }

  user: UserFullInfo
  avatarPath: string
  usersOnline: [UserPublic]

  ngOnInit(): void {

    this.ws.online$.subscribe ( obser => {
      if ( obser != undefined) {
        this.usersOnline = obser
      }
    })

    this.route.paramMap.subscribe(params => {
      let userID = params.get('userid')
      if (userID != '') {
        this.getUserInfo(userID).then( val => {
          this.user = val
          this.avatarPath = val.image
          console.log(val)
        })
      }
    })

  }

  getUserInfo(userID: string): Promise<UserFullInfo> {
    return this.http.get<UserFullInfo>(`api/users/full?user_id=${userID}`).then ( (val) => { 
      return val.body 
    })
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }


  prepareFilesList(file: [any]) {
  
    console.log(file[0])

    const data = new FormData()
    data.append('file', file[0])

    this.http.post<UserPublic> (`api/users/avatar`,null,data ).then ( (val) => {
      console.log ( val );
      window.location.reload();
    })

  }

  isMobile () : boolean {
    return K.isMobile()
  }

}
