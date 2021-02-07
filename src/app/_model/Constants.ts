import { } from '@angular/core'
import { environment } from 'src/environments/environment'

export class Constants {

    public static defaultMenu () : Array<ElemntMenu> {

        let menus = new Array<ElemntMenu>()

        menus.push ( new ElemntMenu('home', '/home') )
        menus.push ( new ElemntMenu('new blog', '/edit/new') )
        menus.push ( new ElemntMenu('calendar', '/calendar') )
        menus.push ( new ElemntMenu('contacts', '/contacts') )
        menus.push ( new ElemntMenu('location', '/location') )

        return menus

    }

    public static isMobile () : boolean {
        if ( navigator.appVersion.toLocaleLowerCase().includes('android') || navigator.appVersion.toLocaleLowerCase().includes('ios')) {
            return true
        } else {
            return ( document.getElementById("backgroundImage").clientWidth < document.getElementById("backgroundImage").clientHeight) 
        }
    }

    public static imagePath = environment.server + 'images/system/earth-globe.png'

    public static imageLike = environment.server + 'images/system/like.png'
    public static imageDislike = environment.server + 'images/system/dislike.png'
    public static imageReport = environment.server + 'images/system/report.png'
    public static imageNoEmotion = environment.server + 'images/system/noemotions.png'
    public static imageComment = environment.server + 'images/system/message.png'
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