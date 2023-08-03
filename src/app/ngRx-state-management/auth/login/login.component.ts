import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loginStart } from '../state/auth.action';
import { setLoadingSpinner } from '../../store/shared/shared.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  loginForm: any
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.email, Validators.required]),
      Password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    })
  }

  onSubmit() {
    const email = this.loginForm.value.Email
    const password = this.loginForm.value.Password
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(loginStart({ email, password }))
  }
}