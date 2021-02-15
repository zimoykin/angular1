import { Component, Input, OnInit } from '@angular/core';
import { BlogModel } from '../../_model/BlogModel';
import { Constants as K } from '../../_model/Constants'

@Component({
  selector: 'app-message-view-short',
  templateUrl: './message-view-short.component.html',
  styleUrls: ['./message-view-short.component.scss']
})
export class MessageViewShortComponent implements OnInit {

  @Input() blog: BlogModel;

  constructor() { }

  imageIcon = K.imageComment

  ngOnInit(): void {

  }

}
