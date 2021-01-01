import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EditPostViewComponent } from '../edit-post-view/edit-post-view.component';

@Component({
  selector: 'app-upload-image-view',
  templateUrl: './upload-image-view.component.html',
  styleUrls: ['./upload-image-view.component.scss']
})
export class UploadImageViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  @Input()
  main: EditPostViewComponent

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }


  prepareFilesList(file: [any]) {
    console.log (this.main)
    this.main.file = file[0]
    console.log (this.main.file)
  }

}
