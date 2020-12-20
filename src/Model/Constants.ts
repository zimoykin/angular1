import { } from '@angular/core'

export class Constants {
    public static server: string = 'http://10.0.1.7:8000/'
}

export interface DecodedToken {
    exp: any
    ext: number
    name: string
    id: string
}