import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from 'src/app/_model/BlogModel';
import { UserPublic } from '../_model/User';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-blogtitle',
  templateUrl: './blogtitle.component.html',
  styleUrls: ['./blogtitle.component.scss']
})
export class BlogtitleComponent implements OnInit {

  @Input() blog: BlogModel
  usersOnline: UserPublic[] = []

  constructor(private ws: WebsocketService) { }

  ngOnInit(): void { 

  }

  getUsers() {
    return this.ws.online$.subscribe ( (users) => {
      this.usersOnline = users
    });
  };

  isUserOnline (userid: string) : boolean {
    return this.usersOnline.filter( (val) => {
      return val.id == userid
    }).length > 0
  }

}
