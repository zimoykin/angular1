import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../header/header.component';
import { User } from '../_model/User';
import { Authorization } from '../_services/AuthrizationService';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {
  }

  login (cred) {
    if (cred.emailLogin.value != '' && cred.passwordLogin.value != '') {
      this.auth.authorize(cred.emailLogin.value, cred.passwordLogin.value).subscribe( (user: User) => {
        if (user != null) {
          window.location.href = '/home'
        }
      })
    }
  }

}
