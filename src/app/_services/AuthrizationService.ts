import { Observable, observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Constants as K, DecodedToken, response } from '../../Model/Constants';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../../Model/User';

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


  public token = `Bearer ${this.cookieService.get('jwt')}`

  isJwtOk(): boolean {

    const token = this.cookieService.get('jwt');

    if (token == null || token == undefined || token == '') {
      return false
    }

    const decoded: DecodedToken = jwtDecode(token);
    if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {

      this.refresh().pipe(
        map( val => {
            return this.isJwtOk()
          }))
    } else { 
      return true
    }

  }

  saveUser (user: User) : Observable <boolean> {

    const saved$ = new Observable <boolean> ( obser => {

      this.cookieService.set ('jwt', user.accessToken)
      this.cookieService.set ('username', user.username)

      localStorage.setItem ('ref', user.refreshToken)

      obser.next (true)

    })

    return saved$
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
        this.saveUser(val).subscribe ( (saved: boolean) => {
          if (saved) {  obser.next(val) }
        })
      })


    })

    return user$

  }

  refresh() : Observable<User> {

    const ref = localStorage.getItem('ref');
    const uri = `${K.server}api/users/refresh`;
    const body = JSON.stringify({ refreshToken: ref });

    return this.http.post(uri, body).pipe(map((data: User) => {
      this.saveUser(data).subscribe ( (val:boolean) => {
      })
      return data;
    }));

  }


}
