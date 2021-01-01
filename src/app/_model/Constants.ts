import { } from '@angular/core'

export class Constants {
    public static server: string = 'http://10.0.0.102:8000/'
   // public static server: string = 'http://10.0.1.7:8000/'

    public static defaultMenu () : Array<ElemntMenu> {

        let menus = new Array<ElemntMenu>()

        menus.push ( new ElemntMenu('home', '/home') )
        menus.push ( new ElemntMenu('new blog', '/edit/new') )
        menus.push ( new ElemntMenu('calendar', '/calendar') )
        menus.push ( new ElemntMenu('contacts', '/contacts') )

        return menus

    }
}

export interface DecodedToken {
    exp: any
    ext: number
    name: string
    id: string
}

export class ElemntMenu {

    title: string 
    route: string

    constructor ( title: string, route: string ) {
        this.title = title
        this.route = route
    }

}