import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';
import { Observable, animationFrameScheduler, asapScheduler, asyncScheduler, observeOn, of, queueScheduler } from 'rxjs';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.css']
})
export class SchedulersComponent implements OnInit, OnDestroy {

  constructor(private _designUtility: DesignUtilityService) { }

  sub: any
  sub2: any
  sub3: any
  sub4: any

  ngOnInit(): void {

    //Ex-01

    const source = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    this._designUtility.addElement_li('just before subscribe', 'elContainer')
    this.sub = source.subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer')
      }
    )
    this._designUtility.addElement_li('just after subscribe', 'elContainer')

    //Ex-02
    const source2 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      observeOn(asyncScheduler)
    );

    this._designUtility.addElement_li('just before subscribe', 'elContainer2')
    this.sub2 = source2.subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer2')
      }
    )
    this._designUtility.addElement_li('just after subscribe', 'elContainer2')

    //Ex-03
    const source3 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      observeOn(queueScheduler)
    );

    this._designUtility.addElement_li('just before subscribe', 'elContainer3')
    this.sub3 = source3.subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer3')
      }
    )
    this._designUtility.addElement_li('just after subscribe', 'elContainer3')

    //Ex-04
    const source4 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      observeOn(asapScheduler)
    );

    this._designUtility.addElement_li('just before subscribe', 'elContainer4')
    this.sub4 = source4.subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer4')
      }
    )
    this._designUtility.addElement_li('just after subscribe', 'elContainer4')

    //Ex-05
    const div = document.getElementById('animationDiv');
    animationFrameScheduler.schedule(function (height) {
      div!.style.height = height + "px";

      this.schedule(height! + 1, 500);
    }, 1500, 100);

    //Ex-06
    queueScheduler.schedule(() => {
      queueScheduler.schedule(() => console.log('second'));
      console.log('first');
    });

    //Ex-07
    queueScheduler.schedule(function (state) {
      if (state !== 0) {
        console.log('before', state);
        this.schedule(state! - 1);
        console.log('after', state);
      }
    }, 0, 3);

    //Ex-08
    asyncScheduler.schedule(() => console.log('async'));
    asapScheduler.schedule(() => console.log('asap'));

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
    if (this.sub2) {
      this.sub2.unsubscribe()
    }
    if (this.sub3) {
      this.sub3.unsubscribe()
    }
    if (this.sub4) {
      this.sub4.unsubscribe()
    }
  }

}