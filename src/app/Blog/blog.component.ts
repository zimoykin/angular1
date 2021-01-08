import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject, observable, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlogModel } from '../_model/BlogModel';
import  { Constants as K } from '../_model/Constants'
import { Authorization } from '../_services/AuthrizationService';

@Component ({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class blogComponent implements OnInit {

    @Input() blogid: string;
    @Input() index: number;
    @Input() isFullVersion: boolean

    imagePath = K.imagePath

    imagePathEmotions$: Subject<string> = new BehaviorSubject(this.imagePath)
    userID$: Subject<string> = new BehaviorSubject('init')
    blog$: Subject<BlogModel> = new BehaviorSubject(undefined)


    constructor( private cookie: CookieService, private http: HttpClient) {}

    auth = new Authorization(this.cookie, this.http)

    ngOnInit () {
        this.userID$.next ( localStorage.getItem('user_id') )
        this.getBlog(this.blogid)
        this.updateUserEmotion();
    }

    private updateUserEmotion() {
        let user_id = localStorage.getItem('user_id');

        this.blog$.subscribe ( blog => {
            if ( blog != undefined && blog.emotions.length > 0) {
                let filtred = blog.emotions.filter(val => {
                    return val.user.id == user_id;
                });
                if (filtred.length > 0) {
                    this.imagePathEmotions$.next(filtred[0].image);
                }
            }
        });
    }

    clickLike(emotion: string) {
        console.log(emotion)
        this.http.post(`${K.server}api/emotions?blogid=${this.blogid}&emotion=${emotion}`, null,
            {
                observe: 'response',
                headers: this.auth.jwtHeader()
            })
            .subscribe( response => {
                if (response.status == 200) {
                    this.getBlog (this.blogid)
                }
            })
    }

    ngOnDestroy () {
        this.userID$.unsubscribe()
    }

    getImageSize () : string {
        return document.getElementById('mainWindow').clientWidth + "px"
    }

    getBlog(blogid: string) {
    
          if (this.auth.token == '' || this.auth.token == null) {
            throw console.error('error');
          }
    
          this.http.get(`${K.server}api/blogs/id?blogid=${blogid}`, {
            headers: { Authorization: this.auth.token }
          }).subscribe((blogs: BlogModel) => {
            this.blog$.next(blogs)
          })
      }

}