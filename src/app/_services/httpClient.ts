import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Data } from "@angular/router";
import { responsiveFontSizes } from "@material-ui/core";
import { CookieService } from "ngx-cookie-service";
import { Authorization } from "./AuthrizationService";
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, timeoutWith } from 'rxjs/operators';

export class Http {

    body: Data
    auth = new Authorization(this.cookie, this.http)

    constructor(private cookie: CookieService, private http: HttpClient) {
    
    }

    get<t>(path: string, params: Param[]): Promise<Resp<t>> {

        let url = path

        //params
        if (params != undefined && params.length > 0) {
            url += "?"

            params.map((val) => {
                url += val.name
                url += `=${val.value}&`
            }
            )
        }

        let result = new Promise<Resp<t>>((result, reject) => {

            //token
            if (this.auth.isJwtOk()) {
                let timeout = setTimeout( () => {
                    reject( new Error ("timeout"))
                }, 10000)
                 //request
                let request = this.http.get<t>(url, { headers: this.auth.jwtHeader(), observe: 'response' })
                    .pipe(
                        map((response) => {
                            clearTimeout(timeout)
                            result(new Resp(response.status, response.body))
                        })
                    ).subscribe()

            }
        }
        )
        return result

    }

}

export class Param {
    name: string
    value: string
    constructor(name: string, value: string) {
        this.name = name
        this.value = value
    }
}
export class Resp<t> {

    status: number
    body: t

    constructor(status: number, body: t) {
        this.status = status
        this.body = body
    }

}