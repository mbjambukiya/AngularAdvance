import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.css']
})
export class DynamicSelectComponent implements OnInit {
  @Input() field: any;
  formName: any;

  constructor(private formgroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.formName = this.formgroupDirective.control;
  }
}