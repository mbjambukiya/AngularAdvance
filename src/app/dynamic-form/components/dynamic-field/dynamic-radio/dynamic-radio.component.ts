import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-radio',
  templateUrl: './dynamic-radio.component.html',
  styleUrls: ['./dynamic-radio.component.css']
})
export class DynamicRadioComponent implements OnInit {
  @Input() field: any;
  formName: any;

  constructor(private formgroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.formName = this.formgroupDirective.control;
  }
}