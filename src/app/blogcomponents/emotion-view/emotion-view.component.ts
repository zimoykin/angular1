import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emotions } from '../../_model/BlogModel';
import { Constants as K } from '../../_model/Constants'
import { Emotion } from '../../_model/Emotion';
import { Http, Param } from '../../_services/http-service.service';

@Component({
  selector: 'app-emotion-view',
  templateUrl: './emotion-view.component.html',
  styleUrls: ['./emotion-view.component.scss']
})
export class EmotionViewComponent implements OnInit {

  @Input() blogid: string;

  loaded: boolean = false

  imagePathEmotions$: Subject<string> = new BehaviorSubject(K.imageNoEmotion)
  emotions$: Subject<[Emotions]> = new BehaviorSubject(undefined)
  //
  imageLike = K.imageLike
  imageDislike = K.imageDislike
  imageReport = K.imageReport
  imageNoEmotion = K.imageNoEmotion
  //

  constructor(private httpClient: Http) { }

  ngOnInit(): void {

    this.httpClient.get<[Emotions]> ( `api/emotions`, [ new Param ('blogid', this.blogid)])
    .then ( response => {
      this.loaded = true
      this.emotions$.next ( response.body )
    })

    this.updateUserEmotion();
  }

  private async updateUserEmotion() {

    let user_id = localStorage.getItem('user_id');

    this.emotions$.subscribe( (emotion) => {
        if (emotion != undefined && emotion.length > 0) {
            let filtred = emotion.filter(val => {
                return val.user.id == user_id;
            });
            if (filtred.length > 0) {
                this.imagePathEmotions$.next(filtred[0].image);
            } else {
                this.imagePathEmotions$.next(K.imageNoEmotion);
            }
        } else {
            this.imagePathEmotions$.next(K.imageNoEmotion);
        }
    });
}

  clickLike(emotion: string) {
    console.log(emotion)
    this.httpClient.post<[Emotion]>(`api/emotions/set?blogid=${this.blogid}&emotion=${emotion}`)
    .then( (response) => {
        if (response.status == 200) {
            console.log("got it!")
            this.emotions$.next (response.body)
            this.updateUserEmotion().then ( () => {
                console.log("updated it!")  
            })
        }
    })
}

}
