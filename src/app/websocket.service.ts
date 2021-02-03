import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Constants as K } from '../app/_model/Constants';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserPublic } from './_model/User';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocket
  connected: boolean
  component: HomeComponent

  listen() {

    this.ws.onclose = (event) => {
      console.log(`ws closed ${event.code}`)
      this.connected = false
    }

    this.ws.onmessage = (event) => {
      console.log(`${event.data}`)
      try {
         if( JSON.parse(event.data) ) {
          let users = Object.assign([UserPublic.prototype], JSON.parse(event.data) );
          this.component.online$.next ( users )
        }
      } catch (error) {
        console.log (error) 
      }
    }

  }

  constructor (private cookieService: CookieService) {
    
    const accessToken = cookieService.get('jwt')
    const ws = new WebSocket(`${K.wsserver}api/ws`);
    
    ws.onopen = (event) => {
      console.log(event)
      ws.send(accessToken)
    }

    ws.onmessage = (event) => {
      if (event.data == 'welcome') {
        this.ws = ws
        this.connected = true
        this.listen()
      } else {
        console.log(event.data)
      }
    }

  }

  public sendMessage ( text: string ) {
    this.ws.send (text)
  }

}
