import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';
import { RxjsAdvanceComponent } from './rxJs-advance/rxjs-advance/rxjs-advance.component';
import { HigherOrderObsComponent } from './rxJs-advance/higher-order-obs/higher-order-obs.component';
import { CustomOperatorComponent } from './rxJs-advance/custom-operator/custom-operator.component';
import { SchedulersComponent } from './rxJs-advance/schedulers/schedulers.component';
import { MulticastingComponent } from './rxJs-advance/multicasting/multicasting.component';
import { SubjectComponent } from './rxJs-advance/subject/subject.component';
import { ReplaySubjectComponent } from './rxJs-advance/replay-subject/replay-subject.component';
import { AsyncSubjectComponent } from './rxJs-advance/async-subject/async-subject.component';
import { HotColdObsComponent } from './rxJs-advance/hot-cold-obs/hot-cold-obs.component';
import { CustomObservableComponent } from './rxJs-advance/custom-observable/custom-observable.component';
import { FlowControlComponent } from './rxJs-advance/flow-control/flow-control.component';
import { CombineTransformOpComponent } from './rxJs-advance/combine-transform-op/combine-transform-op.component';
import { EmployeeFormComponent } from './dynamic-form/employee-form/employee-form.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dynamic-forms', component: DynamicFormComponent },
  { path: 'dynamic-form-array', component: EmployeeFormComponent },
  { path: 'ngRx', loadChildren: () => import('./ngRx-state-management/posts/post.module').then(m => m.PostModule) },
  { path: 'ngRx-effect', loadChildren: () => import('./ngRx-state-management/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'rxjs-advance', component: RxjsAdvanceComponent, children: [
      { path: 'higher-order-obs', component: HigherOrderObsComponent },
      { path: 'custom-operator', component: CustomOperatorComponent },
      { path: 'schedulers', component: SchedulersComponent },
      { path: 'multicasting', component: MulticastingComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'replay-subject', component: ReplaySubjectComponent },
      { path: 'async-subject', component: AsyncSubjectComponent },
      { path: 'hot-cold-obs', component: HotColdObsComponent },
      { path: 'custom-observable', component: CustomObservableComponent },
      { path: 'flow-control', component: FlowControlComponent },
      { path: 'combine-transform', component: CombineTransformOpComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
