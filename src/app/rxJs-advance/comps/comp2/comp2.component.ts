import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../../services/design-utility.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {

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