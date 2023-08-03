import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-error',
  templateUrl: './dynamic-error.component.html',
  styleUrls: ['./dynamic-error.component.css']
})
export class DynamicErrorComponent implements OnInit {
  @Input() fieldName: any;
  formName: any;

  constructor(private formgroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.formName = this.formgroupDirective.control;
  }
}
