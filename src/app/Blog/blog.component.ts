import { Component, OnInit, Input } from "@angular/core";
import { BehaviorSubject, Subject, observable, Observable } from "rxjs";
import { BlogModel, Emotions } from "../_model/BlogModel";
import { Constants as K } from "../_model/Constants";
import { Emotion } from "../_model/Emotion";
import { UserPublic } from "../_model/User";
import { Http, Param } from "../_services/http-service.service";
import { WebsocketService } from "../_services/websocket.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class blogComponent implements OnInit {
  @Input() blogid: string;
  @Input() index: number;
  @Input() isFullVersion: boolean;

  isLoaded$: Subject<boolean> = new BehaviorSubject(false);
  updating$: Subject<boolean> = new BehaviorSubject(false);

  imagePath = K.imagePath;

  imagePathEmotions$: Subject<string> = new BehaviorSubject(K.imageNoEmotion);
  userID$: Subject<string> = new BehaviorSubject("init");
  blog$: Subject<BlogModel> = new BehaviorSubject(undefined);
  emotions$: Subject<[Emotions]> = new BehaviorSubject(undefined);

  //
  imageLike = K.imageLike;
  imageDislike = K.imageDislike;
  imageReport = K.imageReport;
  imageNoEmotion = K.imageNoEmotion;
  //

  currentPictures = 0;
  currentImage$: Subject<string> = new BehaviorSubject("");
  imageList: [string];
  onlineUsers: [UserPublic]

  constructor(
    private http: Http,
    private ws: WebsocketService
    ) {}

  ngOnInit() {
    this.userID$.next(localStorage.getItem("user_id"));
    this.getBlog(this.blogid);
    this.updateUserEmotion();
    this.ws.online$.subscribe ( (obser) => {
      if (obser != undefined) {
        this.onlineUsers = obser
      }
    });
  }

  private async updateUserEmotion() {
    let user_id = localStorage.getItem("user_id");

    this.emotions$.subscribe((emotion) => {
      if (emotion != undefined && emotion.length > 0) {
        let filtred = emotion.filter((val) => {
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
    console.log(emotion);
    this.http
      .post<[Emotion]>(
        `api/emotions/set?blogid=${this.blogid}&emotion=${emotion}`,
        null
      )
      .then((response) => {
        if (response.status == 200) {
          console.log("got it!");
          this.emotions$.next(response.body);
          this.updateUserEmotion().then(() => {
            console.log("updated it!");
          });
        }
      });
  }

  ngOnDestroy() {
    this.userID$.unsubscribe();
  }

  getImageSize(): string {
    if (this.isMobile()) {
      return document.getElementById("mainWindow").clientWidth + "px";
    } else {
      return document.getElementById("mainWindow").clientWidth / 2 + "px";
    }
  }

  getBlog(blogid: string) {

      this.isLoaded$.next(false);

      this.http
        .get<BlogModel>(
            `api/blogs/id`,
            [new Param('blogid', blogid)]
        )
        .then((val) => {
          this.blog$.next(val.body);
          this.emotions$.next(val.body.emotions);
          this.currentImage$.next(val.body.image);
          this.isLoaded$.next(true);
        
        })
        .catch ( () => {
          this.isLoaded$.next(true); 
        })
        ;
  }

  clickPictures() {
    this.updating$.next(true);
    if (this.imageList == undefined) {
      this.http
        .get<[string]>(`api/blogs/images/list?blogid=${this.blogid}`)
        .then((val) => {
          this.imageList = val.body;
          this.updating$.next(false);
          this.changePictures();
        });
    } else {
      this.updating$.next(false);
      this.changePictures();
    }
  }

  async changePictures() {
    this.currentPictures =
      this.currentPictures + 1 > this.imageList.length - 1
        ? 0
        : this.currentPictures + 1;
    console.log("set" + this.currentPictures);
    this.currentImage$.next(this.imageList[this.currentPictures]);
  }

  isMobile(): boolean {
    return K.isMobile();
  }

  userOnline (userid: string) : boolean {
    console.log('is online? ' + userid) 
    return this.onlineUsers.filter( (val) => {
      return val.id == userid
    }).length > 0
  }

}
