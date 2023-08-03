import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.css']
})
export class AsyncSubjectComponent implements OnInit, OnDestroy {

  constructor(private _designUtility: DesignUtilityService) { }

  sub: any

  ngOnInit(): void {
    this.sub = this._designUtility.videoEmitAsync.subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer');
    })
  }

  addNewVideo(video: any) {
    this._designUtility.videoEmitAsync.next(video.value);
  }

  complete() {
    this._designUtility.videoEmitAsync.complete();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
