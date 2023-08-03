import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './ngRx-state-management/store/app.state';
import { getErrorMessage, getLoading } from './ngRx-state-management/store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularAdvance';

  showLoading: any
  errorMessage: any

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading)
    this.errorMessage = this.store.select(getErrorMessage)
  }
}
