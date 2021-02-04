import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'
import { User } from '../_model/User'
import { Constants as K, ElemntMenu} from '../_model/Constants'
import { NavigationEnd, NavigationStart, Router as R, RouterEvent } from '@angular/router'
import { filter } from 'rxjs/operators'
import { Http } from '../_services/http-service.service'


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
  menu: Array<ElemntMenu>
  $routerSub: Observable<RouterEvent>

  constructor( private router: R, private httpClient: Http) { }

  ngAfterViewInit() {
    this.navElement = document.getElementById('navbar') as HTMLElement;
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: Event) {
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

    console.log('init header')
    this.menu = K.defaultMenu()

    const userName = localStorage.getItem('username')
    this.loginName = new Observable<string>(obser => {
      if (userName != '') { obser.next(userName) }
      else { obser.next('LOGIN') }
    })

    this.loginName.subscribe(observer => {

    })

    let $routerSub = this.router.events
    .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    .subscribe( ( event ) => {
      this.showMenu = false
     });

  }

  clickLogin() {
    this.showPanelLogin = !this.showPanelLogin;
  }

  showPanel() {
    console.log ('show nav panel')

    return this.showPanelLogin ? '45' : '0';
  }

  // login(login, password) {
  //   this.auth.authorize(login.value, password.value).subscribe((val: User) => {
    
  //     this.loginName = new Observable<string>((obser) => {
  //       obser.next(val.username)
  //     })
     
  //     this.showPanelLogin = false
  //   })
  // }

  isMobile () : boolean {
    return K.isMobile()
  }

  showHiddenMenu () {
    this.showMenu= !this.showMenu;
  }

  searchSubmit (searchInput: Event) {
    console.log ('search start ' + searchInput) 

    if ( (<HTMLInputElement>document.getElementById('searchInput')).value != '') {
      window.location.href = `/search/${(<HTMLInputElement>document.getElementById('searchInput')).value}`
    }
  }
}
