import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  dynamicFormGroup: FormGroup = {} as FormGroup;
  @Input() model!: any;

  fields: any = [];

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    // this.formDataService.getFormData().subscribe(data => {
    //   this.model = data
    //   this.buildForm();
    // })

    this.formDataService.getFormData().subscribe({
      next: (data) => {
        this.model = data
      },
      complete: () => {
        this.buildForm();
      }
    })
  }


  buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }

  getFormControlsFields() {
    const formGroupFields: any = {};
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];
      const validators = this.addValidator(fieldProps.rules);
      formGroupFields[field] = new FormControl(fieldProps.value, validators);
      this.fields.push({ ...fieldProps, fieldName: field });
    }
    return formGroupFields;
  }

  private addValidator(rules: any): any {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case "required":
          return Validators.required;
        case "minlength":
          return Validators.minLength(rules['minlength']);
        case "maxlength":
          return Validators.maxLength(rules['maxlength']);
        case "email":
          return Validators.email;
        case "pattern":
          return Validators.pattern(rules['pattern']);
        default:
          return []
        //add more cases for the future.
      }
    });
    return validators;
  }

  submitForm() {
    console.log(this.dynamicFormGroup.value)
  }
}