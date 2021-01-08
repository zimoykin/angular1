import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-footerview',
  templateUrl: './footerview.component.html',
  styleUrls: ['./footerview.component.scss']
})
export class FooterviewComponent implements OnInit {

  constructor() { }

  showThis$: Subject<boolean> = new BehaviorSubject(true)

  ngOnInit(): void {
    let loremed = localStorage.getItem('loremed')
    if (loremed == 'set') {
      this.showThis$.next(false)
    } else {
      console.log (loremed)
    }
  }

  loremed () {
    localStorage.setItem('loremed', 'set')
    this.showThis$.next(false)
  }

}
