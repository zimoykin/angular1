import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-background-view',
  templateUrl: './background-view.component.html',
  styleUrls: ['./background-view.component.scss']
})
export class BackgroundViewComponent implements OnInit {

  constructor() { }
  imageURL: string
  backElement: HTMLElement = null

  ngOnInit(): void {
    this.imageURL = this.updateBackGroundImageURL()
  }

  updateBackGroundImageURL() : string {
    return  `url('${'https://images.freeimages.com/images/large-previews/773/koldalen-4-1384902.jpg'}')`
  }

}
