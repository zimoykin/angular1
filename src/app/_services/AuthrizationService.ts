import { Observable, observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants as K, DecodedToken } from '../../Model/Constants';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../../Model/User';
import { HeaderComponent as hat} from '../header/header.component'
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

// const stream$ = of(38,39,40,41,42);
//
// stream$.subscribe( val => {
//     console.log(val)
//   }
// )
//
//
// const observer$ = new Observable ( observer => {
//     observer.next( 'hell yaeh')
//     setTimeout( () => { observer.next( 'hell yaeh !')},3000)
//     setTimeout(() => { observer.error('something went wrong')}, 5000)
// })
//
// observer$.subscribe( val => {
//   console.log (val)
// })


@Injectable({ providedIn: 'root' })
export class Authorization {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  public token:string = `Bearer ${this.cookieService.get('jwt')}`


  ///////////////////
  isJwtOk(): boolean {

    console.log (`1 is jwt ok?`)

    const token = this.cookieService.get('jwt')
    const ref = localStorage.getItem ('ref')

    if (token == '' && ref != '') {
      console.log (`refresh?`)
      this.refresh().subscribe( val => {
        return this.isJwtOk()
      })
    } else if (token == '') {
      console.log ('back')
      return false
    }
    
    const decoded: DecodedToken = jwtDecode(token);
    if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {
      console.log (`jwt explaim`)
      this.refresh().subscribe( (val:User) => {
        console.log('check again')
        this.isJwtOk()
        })
    } else { 
      console.log (`jwt is ok`)
      return true
    }

  }

  saveUser (user: User) : boolean {
      console.log('4 save user')
   
      this.cookieService.set ('jwt', user.accessToken)
      this.cookieService.set ('username', user.username)

      localStorage.setItem ('ref', user.refreshToken)
    
      return true

  }


  authorize ( login: string, password: string ) : Observable<User> {

    console.log (login)

    const uri = `${K.server}api/users/login`;
    let loginpass = (login + ':' + password);
    loginpass = btoa(loginpass);

    const authrizationData = (`Basic ` + loginpass);

    const user$ = new Observable <User> ( obser => {

      this.http.post<any>(uri, null, {
        headers: {
          Authorization: authrizationData
        }
      }).subscribe ( (val: User) => {
        this.saveUser(val)
        obser.next(val)
      })


    })

    return user$

  }

  refresh() : Observable<User> {

    console.log (`ref token start`)

    const ref = localStorage.getItem('ref')
    const uri = `${K.server}api/users/refresh`
    const body = JSON.stringify({ refreshToken: ref })
  
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    const user$ = new Observable <User> ( obser => {
      this.http.post(uri, body, { headers })
      .subscribe ( (user:User) => {
        console.log('2')
        this.saveUser(user)
        obser.complete()
      })
    }) 

    return user$

  }


  logout () : Observable<boolean>{
    return new Observable<boolean>( obser => { 

      this.cookieService.deleteAll()
      localStorage.removeItem('ref')
      obser.next(true)
      
    })
  }

}
