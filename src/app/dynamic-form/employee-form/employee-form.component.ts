import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  employeeForm: FormGroup = {} as FormGroup

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      skills: this.fb.array([this.buildSkill()]),
      address: this.fb.group({
        city: ['', Validators.required],
        zip: ['']
      })
    })
  }

  buildSkill() {
    return this.fb.group({
      language: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(2)]]
    })
  }

  get firstName() {
    return this.employeeForm.controls['firstName']
  }

  get lastName() {
    return this.employeeForm.controls['lastName']
  }

  get email() {
    return this.employeeForm.controls['email']
  }

  get mobile() {
    return this.employeeForm.controls['mobile']
  }

  get city() {
    return this.employeeForm.get('address')?.get('city')
  }

  get zip() {
    return this.employeeForm.get('address')?.get('zip')
  }

  get skills() {
    return this.employeeForm.controls['skills'] as FormArray
  }

  addSkill() {
    this.skills.push(this.buildSkill())
  }

  removeSkill(index: number) {
    this.skills.removeAt(index)
  }

  submitForm() {
    console.log(this.employeeForm.value)
  }
}