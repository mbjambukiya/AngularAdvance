import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-custom-observable',
  templateUrl: './custom-observable.component.html',
  styleUrls: ['./custom-observable.component.css']
})
export class CustomObservableComponent implements OnInit, OnDestroy {

  observable: any
  subscription: any

  constructor(private _designUtility: DesignUtilityService) { }

  ngOnInit(): void {

    this.observable = new Observable((obs) => {
      setInterval(() => {
        obs.next("data emit...");
      }, 1000)

      // setTimeout(() => {
      //   obs.error('Error occurred...');
      // }, 2000)

      setTimeout(() => {
        obs.complete();
      }, 5000)
    });

    this.subscription = this.observable.subscribe({
      next: (res: any) => {
        this._designUtility.addElement_li(res, 'elContainer')
      },
      error: (err: any) => {
        this._designUtility.addElement_li('error', 'elContainer')
      },
      complete: (com: any) => {
        this._designUtility.addElement_li('complete', 'elContainer')
      }
    });
  }


  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
