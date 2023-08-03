import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent implements OnInit, OnDestroy {

  constructor(private _designUtility: DesignUtilityService) { }

  user2subMode: boolean = false;
  user3subMode: boolean = false;

  sub1: any
  sub2: any
  sub3: any

  ngOnInit(): void {
    this.sub1 = this._designUtility.videoEmit.subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer');
    })
  }

  addNewVideo(video: any) {
    this._designUtility.videoEmit.next(video.value);
  }

  user2Subscribe() {
    if (!this.user2subMode) {
      this.sub2 = this._designUtility.videoEmit.subscribe(res => {
        this._designUtility.addElement_li(res, 'elContainer2');
      })
    }
    else {
      if (this.sub2) {
        this.sub2.unsubscribe();
      }
    }
    this.user2subMode = !this.user2subMode
  }

  user3Subscribe() {
    if (!this.user3subMode) {
      this.sub3 = this._designUtility.videoEmit.subscribe(res => {
        this._designUtility.addElement_li(res, 'elContainer3');
      })
    }
    else {
      if (this.sub3) {
        this.sub3.unsubscribe();
      }
    }
    this.user3subMode = !this.user3subMode
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
