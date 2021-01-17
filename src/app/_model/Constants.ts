import { } from '@angular/core'

export class Constants {
    //public static server: string = 'http://10.0.0.102:8000/'
    public static server: string = 'http://10.0.1.7:8000/'
    //public static server: string = 'http://10.0.0.85:8000/'

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
        //console.log (document.getElementById('navbar').clientHeight / document.getElementById('backgroundImage').clientHeight  * 100)
        if ( navigator.appVersion.toLocaleLowerCase().includes('android') || navigator.appVersion.toLocaleLowerCase().includes('ios')) {
            return true
        } else {
            return ( document.getElementById("backgroundImage").clientWidth < document.getElementById("backgroundImage").clientHeight) 
        }
    }

    public static imagePath = Constants.server + 'images/system/earth-globe.png'

    public static imageLike = Constants.server + 'images/system/like.png'
    public static imageDislike = Constants.server + 'images/system/dislike.png'
    public static imageReport = Constants.server + 'images/system/report.png'
    public static imageNoEmotion = Constants.server + 'images/system/noemotions.png'
    
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