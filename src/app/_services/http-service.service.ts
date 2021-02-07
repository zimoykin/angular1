import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Data } from "@angular/router";
import { responsiveFontSizes } from "@material-ui/core";
import { CookieService } from "ngx-cookie-service";
import { Auth } from "./authorization-service.service";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { map, timeoutWith } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Http {
  body: Data;
  server = environment.server;

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private auth: Auth
  ) {}

  get<t>(path: string, params?: Param[]) : Promise<Resp<t>> {
    let url = this.server + path;

    //params
    if (params != undefined && params.length > 0) {
      url += "?";

      params.map((val) => {
        url += val.name;
        url += `=${val.value}&`;
      });
    }

    let result = new Promise<Resp<t>>((result, reject) => {
      //token
      this.auth.isJwtOk().then ( () => {

        let timeout = setTimeout(() => {
          reject(new Error("timeout"));
        }, 10000);

        //request
        let request = this.http
          .get<t>(url, { headers: this.auth.jwtHeader(), observe: "response" })
          .pipe(
            map((response) => {
              clearTimeout(timeout);
              result(new Resp(response.status, response.body));
            })
          )
          .subscribe();

      }
    ).catch ( () => {
      reject('token did not refreshed')
    })
    });

    return result;
  }

  post<t>(path: string, body?: string, file?: FormData): Promise<Resp<t>> {
    let url = this.server + path;

    return new Promise( (resolve, reject) => {
      //token
      if (this.auth.isJwtOk()) {
        let timeout = setTimeout(() => {
          reject(new Error("timeout"));
        }, 10000);
        //request
        let request = this.http
          .post<t>(
            url,
            body!=null ? body : file,
           {headers: this.auth.jwtHeader(),
            observe: "response",
          })
          .pipe(
            map((response) => {
              clearTimeout(timeout);
              resolve(new Resp(response.status, response.body));
            })
          )
          .subscribe();
      }
    });
  }

  put<t>(path: string, body?: string): Promise<Resp<t>> {
    let url = this.server + path;

    return new Promise((resolve, reject) => {
      //token
      if (this.auth.isJwtOk()) {
        let timeout = setTimeout(() => {
          reject(new Error("timeout"));
        }, 10000);
        //request
        let request = this.http
          .put<t>(url, body, {
            headers: this.auth.jwtHeader(),
            observe: "response",
          })
          .pipe(
            map((response) => {
              clearTimeout(timeout);
              resolve(new Resp(response.status, response.body));
            })
          )
          .subscribe();
      }
    });
  }

  delete<t>(path: string, body?: string): Promise<Resp<t>> {
    let url = this.server + path;

    return new Promise((resolve, reject) => {
      //token
      if (this.auth.isJwtOk()) {
        let timeout = setTimeout(() => {
          reject(new Error("timeout"));
        }, 10000);
        //request
        let request = this.http
          .delete<t>(url, {
            headers: this.auth.jwtHeader(),
            observe: "response",
          })
          .pipe(
            map((response) => {
              clearTimeout(timeout);
              resolve(new Resp(response.status, response.body));
            })
          )
          .subscribe();
      }
    });
  }


  register<t>(path: string, body?: string): Promise<Resp<t>> {
   
    let url = this.server + path;

    return new Promise( (resolve, reject) => {
     
        let timeout = setTimeout(() => {
          reject(new Error("timeout"));
        }, 10000);
       
        let request = this.http
          .post<t>(
            url,
            body,
            { observe: "response" }
          )
          .pipe(
            map((response) => {
              clearTimeout(timeout);
              resolve(new Resp(response.status, response.body));
            })
          )
          .subscribe();
    });
  }



}

export class Param {
  name: string;
  value: string;
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
export class Resp<t> {
  status: number;
  body: t;

  constructor(status: number, body: t) {
    this.status = status;
    this.body = body;
  }
}
