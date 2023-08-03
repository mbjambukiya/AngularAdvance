import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';
import { concatMap, delay, exhaustMap, from, fromEvent, interval, mergeMap, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-higher-order-obs',
  templateUrl: './higher-order-obs.component.html',
  styleUrls: ['./higher-order-obs.component.css']
})
export class HigherOrderObsComponent implements AfterViewInit, OnDestroy {

  constructor(private _designUtility: DesignUtilityService) { }

  sub: any
  sub2: any
  sub3: any
  sub4: any

  @ViewChild('inpBtn') inpBtn: ElementRef | undefined

  ngAfterViewInit(): void {
    const sourceTech = from(['Tech', 'Comedy', 'News'])

    //concatMap
    this.sub = sourceTech.pipe(
      concatMap(v => this.getData(v))
    ).subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer')
      }
    )

    //mergeMap
    this.sub2 = sourceTech.pipe(
      mergeMap(v => this.getData(v))
    ).subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer2')
      }
    )

    //switchMap
    this.sub3 = sourceTech.pipe(
      switchMap(v => this.getData(v))
    ).subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer3')
      }
    )

    //exhaustMap
    this.sub4 = fromEvent(this.inpBtn?.nativeElement, 'click').pipe(
      exhaustMap(() => interval(1000).pipe(take(3)))
    ).subscribe(
      res => {
        this._designUtility.addElement_li(res, 'elContainer4')
      }
    )
  }

  getData(data: any) {
    return of(data + ' video uploaded').pipe(delay(1000))
  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
    if (this.sub2) {
      this.sub2.unsubscribe()
    }
    if (this.sub3) {
      this.sub3.unsubscribe()
    }
    if (this.sub4) {
      this.sub4.unsubscribe()
    }
  }

}