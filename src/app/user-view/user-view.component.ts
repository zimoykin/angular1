import { Component, OnInit } from '@angular/core';
import { User, UserFullInfo, UserPublic } from '../_model/User';
import { Authorization } from '../_services/AuthrizationService'
import { Constants as K } from '../_model/Constants'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private coockie: CookieService) { }

  user: UserFullInfo
  auth = new Authorization(this.coockie, this.http)
  avatarPath: string

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let userID = params.get('userid')
      if (userID != '') {
        this.getUserInfo(userID).subscribe(val => {
          this.user = val
          this.avatarPath = val.image
          console.log(val)
        })
      }
    })

  }

  getUserInfo(userID: string): Observable<UserFullInfo> {
    return this.http.get<UserFullInfo>(`${K.server}api/users/full?user_id=${userID}`, {
      headers: { Authorization: this.auth.token }
    })
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }


  prepareFilesList(file: [any]) {
  
    console.log(file[0])

    const data = new FormData()
    data.append('file', file[0])

    this.http.post(`${K.server}api/users/avatar`, data, {
      headers: new HttpHeaders({
        'Authorization': this.auth.token
      })
    }).subscribe ( (val: UserPublic) => {
      console.log ( val );
      window.location.reload();
      //this.user.image = val.image
    })

  }

}
