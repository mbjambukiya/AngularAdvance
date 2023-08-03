import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  constructor() { }

  username = new Subject<string>();
  username_bSub = new BehaviorSubject<string>('Test_User');
  videoEmit = new ReplaySubject<string>(3, 5000);
  videoEmitAsync = new AsyncSubject<string>();

  addElement_li(val: any, containerId: any) {
    let el = document.createElement('li');
    el.innerText = val;
    document.getElementById(containerId)?.appendChild(el);
  }
}
