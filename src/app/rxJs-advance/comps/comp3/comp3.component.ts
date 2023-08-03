import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../../services/design-utility.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit {

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

  onChange(uName: any) {
    this._designUtility.username.next(uName.value);
    this._designUtility.username_bSub.next(uName.value);
  }
}