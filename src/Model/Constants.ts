import { } from '@angular/core'

export class Constants {
    public static server: string = 'http://10.0.0.102:8000/'
}

export interface DecodedToken {
    exp: any
    ext: number
    name: string
    id: string
}

export class response {
    accessToken: string;
    refreshToken: string;
    username: string
  }