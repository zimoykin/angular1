import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Constants as K } from '../_model/Constants';
import { UserPublic } from '../_model/User';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocket
  online$: Subject<[UserPublic]> = new BehaviorSubject( undefined )
  connected$: Subject<boolean> = new BehaviorSubject(false)

  listen() {

    this.ws.send('whoisonline?')

    this.ws.onclose = (event) => {
      console.log(`ws closed ${event.code}`)
      this.connected$.next(false)
    }

    this.ws.onmessage = (event) => {
      console.log(`${event.data}`)
      try {
         if( JSON.parse(event.data) ) {
          let users = Object.assign([UserPublic.prototype], JSON.parse(event.data) );
          this.online$.next (users)
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
        this.connected$.next(true)
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
