import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; 
import { Constants as K, DecodedToken, response as resp, response } from '../../Model/Constants'
import jwtDecode from 'jwt-decode'
import { Refresh } from '@material-ui/icons';
import { R3ResolvedDependencyType } from '@angular/compiler';
import { promise } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  navElement: HTMLElement = null;
  loginName = "login"
  showPanelLogin = false

  constructor ( private httpClient: HttpClient, private cookieService: CookieService ) { }

  ngAfterViewInit() {
    this.navElement = <HTMLElement> document.getElementById("navbar");
  }

  @HostListener("window:scroll", ["$event"])
  //@ViewChild('loginPanel') loginPanel: ElementRef;

  onScroll($event: Event) {
    let scrollFactor = 100;
    let opacity = (window.pageYOffset / scrollFactor);
    opacity = opacity < 1 ? opacity : 1;

    if (opacity <= 1) {
      this.navElement.style.backgroundColor = "rgba(255, 215, 235, " + opacity + ")";
    }

    if (window.pageYOffset / scrollFactor > 1) {
      this.navElement.classList.add("navbar-shadow");
    } else {
      this.navElement.classList.remove("navbar-shadow");
    }
  }

  ngOnInit() {

   const userNamne = this.cookieService.get ('username')
   if (userNamne !='') {
      this.loginName = userNamne
   } else {
      this.loginName = "login"
   }

   const token = this.cookieService.get('jwt')
   if (token != null && token != '') {
      let decoded: DecodedToken = jwtDecode(token)
      console.log(decoded)
      console.log ( Math.floor((new Date).getTime() / 1000)  )
      if ( Math.floor((new Date).getTime() / 1000) > decoded.exp ) {
          console.log ( 'token is expired' )
        
        this.refresh().subscribe ( nw =>  {
            console.log('wwwww')
        }
          
      } else {
        console.log ( 'token is ok' )
      }
   }


  }

  clickLogin () {
    this.showPanelLogin = !this.showPanelLogin
    if (this.showPanelLogin) {
        setTimeout( () => {
          if (this.showPanelLogin) {
            this.clickLogin()  
          }  
        }, 25000)
    }
  }

    showPanel () {
      return this.showPanelLogin ? 45 : 0;
    }

    login (login, password) {
      
      this.authorize(login.value, password.value).subscribe (
          response => { 
              console.log(response)
              this.cookieService.set('jwt', response.accessToken)
              this.cookieService.set('username', response.username)
              localStorage.setItem('ref', response.refreshToken)

          }
      )

    }

    authorize (login, password): Observable<any> {

      const uri = `${K.server}/api/users/login`
      let loginpass = ( login + ":" + password )
      loginpass = btoa(loginpass)

      const authrizationData = (`Basic ` + loginpass)
      console.log (authrizationData)
      console.log (login)
      console.log (password)

      return this.httpClient.post <any> (uri, null, { headers: { 
          'Authorization' : authrizationData 
      }}  )

    }

    refresh () : Observable<boolean> {

      const ref = localStorage.getItem( 'ref' )
      const uri = `${K.server}api/users/refresh`
      const body = JSON.stringify( { refreshToken: ref } )

      let result = this.httpClient.post(uri, body).subscribe ( (response: response) => { 

        console.log(response)
        this.cookieService.set('jwt', response.accessToken)
        this.cookieService.set('username', response.username)
        localStorage.setItem('ref', response.refreshToken)
          
        return true

      })
    }

}
