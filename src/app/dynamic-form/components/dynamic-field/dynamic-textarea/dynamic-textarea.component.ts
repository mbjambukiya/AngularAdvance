import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  styleUrls: ['./dynamic-textarea.component.css']
})
export class DynamicTextareaComponent implements OnInit {
  @Input() field: any;
  formName: any;

  constructor(private formgroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.formName = this.formgroupDirective.control;
  }
}