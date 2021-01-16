import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { User, UserFullInfo } from '../_model/User';
import { Authorization } from '../_services/AuthrizationService';
import { Constants as K } from '../_model/Constants'
import { Http, Param } from '../_services/httpClient';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  auth = new Authorization(this.cookieService, this.httpClient)
  http = new Http (this.cookieService, this.httpClient)
  logined: string
  username: string
  imagePath$: Subject<string> = new BehaviorSubject ('')

  mode: string = 'login'

  ngOnInit(): void {
    
    if ( localStorage.getItem('user_id') ) {
      this.logined = localStorage.getItem('user_id')
      this.username = localStorage.getItem('username')

      this.http.get<UserFullInfo> (`${K.server}api/users/full`, [new Param('user_id', this.logined)])
      .then ( val => {
        this.imagePath$.next ( val.body.image )
      })

    } else {
      this.logined = ''
    }
  }

  login (cred) {
    if (this.mode!='login') {
      this.mode = 'login'
      return
    } 
    if (cred.emailLogin.value != '' && cred.passwordLogin.value != '') {
      this.auth.authorize(cred.emailLogin.value, cred.passwordLogin.value).subscribe( (user: User) => {
        if (user != null) {
          window.location.href = '/home'
        }
      })
    }
  }

  registerNew (username, email, password) {
    console.log ('register' + password.value)
    if (email.value != '' && password.value != ''  && username.value != '') {
      this.auth.register(username.value, email.value, password.value)
      .subscribe( (user: User) => {
        if (user != null) {
          window.location.href = '/home'
        }
      })
    }
  }

  clickLogOut() {

    this.auth.logout().subscribe((val: boolean) => {
      if (val) { this.logined = '' }
    })

  }

  isMobile () : boolean {
    return K.isMobile()
  }

  changeMode () {
    this.mode = this.mode == 'login' ? 'register' : 'login'
  }

}
