import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Authorization } from '../_services/AuthrizationService'
import { Observable } from 'rxjs'
import { User } from '../_model/User'
import { Constants as K, ElemntMenu} from '../_model/Constants'
import { NavigationEnd, NavigationStart, Router as R, RouterEvent } from '@angular/router'
import { filter } from 'rxjs/operators'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  navElement: HTMLElement = null
  loginName: Observable<string>
  showPanelLogin = false
  showMenu = false
  auth = new Authorization(this.cookieService, this.httpClient)
  menu: Array<ElemntMenu>
  $routerSub: Observable<RouterEvent>

  constructor( private router: R, private httpClient: HttpClient, private cookieService: CookieService) { }

  ngAfterViewInit() {
    this.navElement = document.getElementById('navbar') as HTMLElement;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: Event) {
    console.log ('')
    this.showMenu = false
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event) {
    const scrollFactor = 100;
    let opacity = (window.pageYOffset / scrollFactor);
    opacity = opacity < 0.7 ? opacity : 0.7;

    if (opacity <= 1) {
      this.navElement.style.backgroundColor = 'rgba(185, 222, 223, ' + opacity + ')'
    }

    if (window.pageYOffset / scrollFactor > 1) {
      this.navElement.classList.add('navbar-shadow')
    } else {
      this.navElement.classList.remove('navbar-shadow')
    }
  }
  @HostListener('window:click', ['$event'])
  onClick($event: Event) {

    let target = document.getElementById('hiddenMenu')

    if (target == null || target == undefined) {
      return
    }

    if ( !$event.composedPath().includes(target) && target.clientWidth > 0 ) {
      this.showMenu = !this.showMenu   
    }
  }

  ngOnDestroy () {
    this.$routerSub = null
  }

  ngOnInit() {

     console.log ('init header')
     this.menu = K.defaultMenu()

    const userName = this.cookieService.get('username')
    this.loginName = new Observable<string>(obser => {
      if (userName != '') { obser.next(userName) }
      else { obser.next('LOGIN') }
    })

    this.loginName.subscribe(observer => {

      console.log ('head check jwt')

      if (this.auth.isJwtOk()) {
          console.log ( 'jwt is ok 59')
      } else {
        console.log ( 'jwt isnt ok 61') 
      }
    })
    let $routerSub = this.router.events
    .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    .subscribe( ( event ) => {

      this.showMenu = false

      if (!this.auth.isJwtOk()) {
        if (event.url != '/login') {
          console.log( window.location.href) 
          window.location.href = '/login'
        }
      }
     });

  }

  clickLogin() {
    this.showPanelLogin = !this.showPanelLogin;
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
    console.log ('show nav panel')

    return this.showPanelLogin ? '45' : '0';
  }

  login(login, password) {
    this.auth.authorize(login.value, password.value).subscribe((val: User) => {
    
      this.loginName = new Observable<string>((obser) => {
        obser.next(val.username)
      })
     
      this.showPanelLogin = false
    })
  }

  isMobile () : boolean {
    return K.isMobile()
  }

  showHiddenMenu () {
    this.showMenu= !this.showMenu;
  }
}
