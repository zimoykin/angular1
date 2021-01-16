import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-view',
  templateUrl: './loader-view.component.html',
  styleUrls: ['./loader-view.component.scss']
})
export class LoaderViewComponent implements OnInit {

  constructor() { }

  @Input() load: boolean

  ngOnInit(): void {
    
  }

}
