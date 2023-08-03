import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, OnDestroy {

  constructor(private _designUtility: DesignUtilityService) { }

  username: string = 'Test_User'
  username_bSub: string = ''

  ngOnInit(): void {
    this._designUtility.username.subscribe(res => {
      this.username = res
    });
    this._designUtility.username_bSub.subscribe(res => {
      this.username_bSub = res
    });
  }

  ngOnDestroy(): void {
  }

}