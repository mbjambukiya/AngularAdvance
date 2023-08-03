import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-hot-cold-obs',
  templateUrl: './hot-cold-obs.component.html',
  styleUrls: ['./hot-cold-obs.component.css']
})
export class HotColdObsComponent implements OnInit {

  constructor(private _designUtility: DesignUtilityService) { }

  ngOnInit(): void {

    // const hotObservable = fromEvent(document, 'click');

    // // subscription 1
    // hotObservable.subscribe((event: any) => {
    //   this._designUtility.addElement_li('sub 1-clientX-' + event.clientX, 'elContainer')
    //   this._designUtility.addElement_li('sub 1-clientY-' + event.clientY, 'elContainer')
    // });

    // // subscription 2
    // hotObservable.subscribe((event: any) => {
    //   this._designUtility.addElement_li('sub 2-clientX-' + event.clientX, 'elContainer')
    //   this._designUtility.addElement_li('sub 2-clientY-' + event.clientY, 'elContainer')
    // });

    var random = Math.random()

    const hotObservable = Observable.create((observer: any) => {
      observer.next(random);
    });

    // subscription 1
    hotObservable.subscribe((data: any) => {
      this._designUtility.addElement_li('sub 1-' + data, 'elContainer')
    });

    // subscription 2
    hotObservable.subscribe((data: any) => {
      this._designUtility.addElement_li('sub 2-' + data, 'elContainer')
    });

    const coldObservable = Observable.create((observer: any) => {
      observer.next(Math.random());
    });

    // subscription 1
    coldObservable.subscribe((data: any) => {
      this._designUtility.addElement_li('sub 1-' + data, 'elContainer2')
    });

    // subscription 2
    coldObservable.subscribe((data: any) => {
      this._designUtility.addElement_li('sub 2-' + data, 'elContainer2')
    });
  }
}
