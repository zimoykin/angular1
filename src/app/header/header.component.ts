import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navElement: HTMLElement = null;
  loginName = "login"
  showPanelLogin = false

  constructor() { }

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

  ngOnInit() {}


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

    login (data) {
        console.log (data.password)
    }
}
