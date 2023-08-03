import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DynamicFieldComponent } from './dynamic-form/components/dynamic-field/dynamic-field.component';
import { DynamicInputComponent } from './dynamic-form/components/dynamic-field/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from './dynamic-form/components/dynamic-field/dynamic-textarea/dynamic-textarea.component';
import { DynamicCheckboxComponent } from './dynamic-form/components/dynamic-field/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicRadioComponent } from './dynamic-form/components/dynamic-field/dynamic-radio/dynamic-radio.component';
import { DynamicSelectComponent } from './dynamic-form/components/dynamic-field/dynamic-select/dynamic-select.component';
import { DynamicErrorComponent } from './dynamic-form/components/dynamic-error/dynamic-error.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './ngRx-state-management/store/app.store';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './testCases/components/home/home.component';
import { RxjsAdvanceComponent } from './rxJs-advance/rxjs-advance/rxjs-advance.component';
import { HigherOrderObsComponent } from './rxJs-advance/higher-order-obs/higher-order-obs.component';
import { CustomOperatorComponent } from './rxJs-advance/custom-operator/custom-operator.component';
import { SchedulersComponent } from './rxJs-advance/schedulers/schedulers.component';
import { MulticastingComponent } from './rxJs-advance/multicasting/multicasting.component';
import { SubjectComponent } from './rxJs-advance/subject/subject.component';
import { Comp1Component } from './rxJs-advance/comps/comp1/comp1.component';
import { Comp2Component } from './rxJs-advance/comps/comp2/comp2.component';
import { Comp3Component } from './rxJs-advance/comps/comp3/comp3.component';
import { AsyncSubjectComponent } from './rxJs-advance/async-subject/async-subject.component';
import { ReplaySubjectComponent } from './rxJs-advance/replay-subject/replay-subject.component';
import { MarbleTestingComponent } from './rxJs-advance/marble-testing/marble-testing.component';
import { HotColdObsComponent } from './rxJs-advance/hot-cold-obs/hot-cold-obs.component';
import { CustomObservableComponent } from './rxJs-advance/custom-observable/custom-observable.component';
import { FlowControlComponent } from './rxJs-advance/flow-control/flow-control.component';
import { CombineTransformOpComponent } from './rxJs-advance/combine-transform-op/combine-transform-op.component';
import { EmployeeFormComponent } from './dynamic-form/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFieldComponent,
    DynamicInputComponent,
    DynamicTextareaComponent,
    DynamicCheckboxComponent,
    DynamicRadioComponent,
    DynamicSelectComponent,
    DynamicErrorComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    RxjsAdvanceComponent,
    HigherOrderObsComponent,
    CustomOperatorComponent,
    SchedulersComponent,
    MulticastingComponent,
    SubjectComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    AsyncSubjectComponent,
    ReplaySubjectComponent,
    MarbleTestingComponent,
    HotColdObsComponent,
    CustomObservableComponent,
    FlowControlComponent,
    CombineTransformOpComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
