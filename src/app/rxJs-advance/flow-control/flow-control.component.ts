import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';
import { Subject, buffer, bufferCount, bufferTime, debounceTime, fromEvent, interval, map, mergeAll, never, sampleTime, switchMap, take, tap, throttleTime, windowTime } from 'rxjs';

@Component({
  selector: 'app-flow-control',
  templateUrl: './flow-control.component.html',
  styleUrls: ['./flow-control.component.css']
})
export class FlowControlComponent implements AfterViewInit, OnDestroy {

  constructor(private _designUtility: DesignUtilityService) { }

  @ViewChild('inp1') inp1: ElementRef | undefined

  search1: any
  sub1: any
  sub2: any
  sub3: any
  sub4: any
  sub5: any
  sub6: any
  sub7: any

  ngAfterViewInit(): void {

    const searchTerm = fromEvent(this.inp1?.nativeElement, 'keyup');

    //loosy techniques
    //debounceTime
    this.sub1 = searchTerm.pipe(
      map((x: any) => x.target.value),
      debounceTime(1000)
    ).subscribe(
      res => {
        console.log(res)
        this.search1 = res
        this._designUtility.addElement_li(res, 'elContainer')
      }
    )

    //throttleTime
    this.sub2 = fromEvent(window, 'resize').pipe(throttleTime(1000)).subscribe(res => {
      console.log(res)
    })

    //sampleTime
    this.sub3 = interval(1000).pipe(take(15), sampleTime(2000)).subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer2')
    })

    // this.sub1 = interval(500).pipe(take(12), debounceTime(1000)).subscribe(
    //   res => {
    //     console.log(res)
    //     // this.search1 = res
    //     this._designUtility.addElement_li(res, 'elContainer')
    //   }
    // )

    //pausable approach
    const source = interval(500);
    const pauser = new Subject();
    const pausable = pauser.pipe(switchMap(paused => {
      return paused ? never() : source;
    }));
    pausable.subscribe(x => {
      this._designUtility.addElement_li(x, 'elContainer3')
    });

    pauser.next(false);
    setTimeout(function () {
      pauser.next(true);
    }, 3000);

    //looseless techniques
    //buffer
    this.sub4 = interval(1000).pipe(buffer(fromEvent(document, 'click'))).subscribe(
      (res: any) => {
        this._designUtility.addElement_li(res, 'elContainer4')
      }
    );

    //bufferCount
    this.sub5 = interval(1000).pipe(bufferCount(3)).subscribe(
      (res: any) => {
        this._designUtility.addElement_li(res, 'elContainer5')
      }
    );

    //bufferTime
    this.sub6 = interval(1000).pipe(bufferTime(5000)).subscribe(
      (res: any) => {
        this._designUtility.addElement_li(res, 'elContainer6')
      }
    );

    //windowTime
    this.sub7 = interval(1000)
      .pipe(
        windowTime(3000),
        tap(() => this._designUtility.addElement_li('New Window', 'elContainer7')),
        mergeAll())
      .subscribe(
        (res: any) => {
          this._designUtility.addElement_li(res, 'elContainer7')
        }
      );
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe()
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
    if (this.sub5) {
      this.sub5.unsubscribe()
    }
    if (this.sub6) {
      this.sub6.unsubscribe()
    }
    if (this.sub7) {
      this.sub7.unsubscribe()
    }
  }

}