import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'

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

      const uri = "http://10.0.0.102:8000/api/users/login"
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
}
