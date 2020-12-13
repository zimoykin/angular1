import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Authorization } from '../_services/AuthrizationService'
import { Observable } from 'rxjs'
import { User } from 'src/Model/User'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  navElement: HTMLElement = null
  loginName: Observable<string>
  showPanelLogin = false
  auth = new Authorization(this.cookieService, this.httpClient)

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  ngAfterViewInit() {
    this.navElement = document.getElementById('navbar') as HTMLElement;
  }

  @HostListener('window:scroll', ['$event'])

  onScroll($event: Event) {

    const scrollFactor = 100;
    let opacity = (window.pageYOffset / scrollFactor);
    opacity = opacity < 1 ? opacity : 1;

    if (opacity <= 1) {
      this.navElement.style.backgroundColor = 'rgba(255, 215, 235, ' + opacity + ')'
    }

    if (window.pageYOffset / scrollFactor > 1) {
      this.navElement.classList.add('navbar-shadow')
    } else {
      this.navElement.classList.remove('navbar-shadow')
    }
  }

  ngOnInit() {

    const userName = this.cookieService.get('username')
    this.loginName = new Observable<string>(obser => {
      if (userName != '') { obser.next(userName) }
      else { obser.next('LOGIN') }
    })

    this.loginName.subscribe(observer => {

      if (this.auth.isJwtOk()) {

      }
    })

  }

  clickLogin() {
    this.showPanelLogin = !this.showPanelLogin;
    if (this.showPanelLogin) {
      setTimeout(() => {
        if (this.showPanelLogin) {
          this.clickLogin();
        }
      }, 25000);
    }
  }

  clickLogOut() {

    this.auth.logout().subscribe((val: boolean) => {
      if (val) {
        this.loginName = new Observable<string>(obser => { obser.next('') })
      }
    }
    )
  }


  showPanel() {
    return this.showPanelLogin ? 45 : 0;
  }

  login(login, password) {
    this.auth.authorize(login.value, password.value).subscribe((val: User) => {
      console.log("q" + val)
      this.loginName = new Observable<string>((obser) => {
        obser.next(val.username)
      })
      console.log("q" + val)
      this.showPanelLogin = false
    })
  }

}
