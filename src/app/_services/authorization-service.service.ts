import { Observable, observable, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Constants as K, DecodedToken } from '../_model/Constants';
import jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { User, UserPublic } from '../_model/User';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class Auth {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
    ) { }

    public token: string = `Bearer ${this.cookieService.get('jwt')}`


    ///////////////////
    isJwtOk(): boolean {
  
      console.log(`func isJwtOk`)
  
      const token = this.cookieService.get('jwt')
      const ref = localStorage.getItem('ref')
  
      if (ref == '' || ref == null || ref == undefined) {
        console.log(`without refresh!`)
        return false
      }
  
      console.log(`has ref`)
  
      if (token != undefined && token != '') {
        console.log(`has token, it will decoded`)
        console.log(token)
        const decoded: DecodedToken = jwtDecode(token);
        console.log(`token was decoded`)
        if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {
          console.log(`jwt explaim`)
          this.refresh().subscribe((val: User) => {
            console.log('check again')
            this.isJwtOk()
          })
        } else {
          console.log(`jwt is ok`)
          return true
        }
      }
  
      if (ref != '' || ref != null || ref != undefined) {
        console.log(`refresh?`)
        this.refresh().subscribe(val => {
          if (val == null) {
            console.log('back false')
            return false
          } else {
            return this.isJwtOk()
          }
        })
      } else if (token == '') {
        console.log('back false 2')
        return false
      }
  
    }
  
    saveUser(user: User): boolean {
      console.log('4 save user')
  
      this.cookieService.set('jwt', user.accessToken)
  
      localStorage.setItem('ref', user.refreshToken)
      localStorage.setItem('username', user.username)
      localStorage.setItem('user_id', user.id)
  
      return true
  
    }
  
  
    authorize(login: string, password: string) : Observable<User> {
  
      console.log(login)
  
      const uri = `${environment.server}api/users/login`;
      let loginpass = (login + ':' + password);
      loginpass = btoa(loginpass);
  
      const authrizationData = (`Basic ` + loginpass);
  
      const user$ = new Observable<User>(obser => {
  
        this.http.post<any>(uri, null, {
          headers: {
            Authorization: authrizationData
          }
        }).subscribe((val: User) => {
          this.saveUser(val)
          obser.next(val)
        })
      })
  
      return user$
  
    }
  
    register(username: string, email: string, password: string) : Observable<User> {
      console.log("register")
      const uri = `${environment.server}api/users/signin`;
  
      const user$ = new Observable<User>(obser => {
  
        this.http.post<UserPublic>(uri, JSON.stringify({
          username: username,
          email: email,
          password: password
        })).subscribe((val: User) => {
          this.saveUser(val)
          obser.next(val)
        })
  
  
      })
  
      return user$
  
    }
  
    refresh() : Observable<User> {
  
      console.log(`refresh token started`)
      const ref = localStorage.getItem('ref')
      const uri = `${environment.server}api/users/refresh`
      const body = JSON.stringify({ refreshToken: ref })
  
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
  
      const user$ = new Observable<User>(obser => {
  
        this.http.post<User>(uri, body, { headers, observe: 'response' })
        .pipe(
          catchError((err) => {
            return throwError(err);
          }),
           map(response => {
              if (response.ok) {
                this.saveUser((<User>response.body))
                obser.complete()
              } else {
                obser.closed
              }
            }
          )).subscribe()
        
      })
      return user$
    }
  
    logout() : Observable < boolean > {
        return new Observable<boolean>(obser => {
  
          this.cookieService.deleteAll()
          localStorage.removeItem('ref')
          localStorage.removeItem('username')
          localStorage.removeItem('user_id')
          obser.next(true)
  
        })
      }
  
    jwtHeader() : HttpHeaders {
        return new HttpHeaders({ Authorization: this.token })
      }






}
