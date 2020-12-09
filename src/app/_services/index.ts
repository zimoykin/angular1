import {Observable, observable, of} from "rxjs"
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {Constants as K, DecodedToken, response} from "../../Model/Constants";
import jwtDecode from 'jwt-decode';
import {map} from "rxjs/operators"

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



export class Authorization {

  constructor(cookieService: CookieService, http: HttpClient) {}

 // checkJWT();

  accessToken$ = new Observable( observer => {
    cookieService.set('accessToken', observer)
  })

  checkJWT () {

    const token = this.cookieService.get('jwt');
    if (token != null && token != '') {
      const decoded: DecodedToken = jwtDecode(token);
      console.log(decoded);
      console.log(Math.floor((new Date).getTime() / 1000));
      if (Math.floor((new Date).getTime() / 1000) > decoded.exp) {
        console.log('token is expired');
        this.refresh()
          .pipe(
            map( v => {  console.log(v);  }
            )
          );

      } else {
        console.log('token is ok');
      }
    }

  }

  authorize(login, password): Observable<any> {

        const uri = `${K.server}/api/users/login`;
        let loginpass = ( login + ':' + password );
        loginpass = btoa(loginpass);

        const authrizationData = (`Basic ` + loginpass);
        console.log (authrizationData);
        console.log (login);
        console.log (password);

        return this.httpClient.post <any> (uri, null, { headers: {
            Authorization : authrizationData
          }}  );

  }

  refresh(): Observable<any> {

    const ref = localStorage.getItem( 'ref' );
    const uri = `${K.server}api/users/refresh`;
    const body = JSON.stringify( { refreshToken: ref } );

    return this.httpClient.post(uri, body).pipe ( map ( (data: response) => {
      this.cookieService.set ('jwt', data.accessToken);
      this.cookieService.set ('userName', data.username);

      localStorage.setItem('ref', data.refreshToken);

      console.log ('saved');
      return 'saved';
    }));

  }


}
