import { Component, OnInit, Input } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { BlogModel } from '../_model/BlogModel';
import  { Constants as K } from '../_model/Constants'

@Component ({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class blogComponent implements OnInit {

    @Input() blog: BlogModel;
    @Input() index: number;
    @Input() isFullVersion: boolean
    imagePath = K.imagePath
    userID$: Subject<string> = new BehaviorSubject('init')

    constructor( private cookie: CookieService) {}

    ngOnInit () {
        this.userID$.next ( localStorage.getItem('user_id') )
    }

    ngOnDestroy () {
        this.userID$.unsubscribe()
    }

    getImageSize () : string {
        return document.getElementById('mainWindow').clientWidth + "px"
    }

}