import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';
import { combineLatest, combineLatestAll, combineLatestWith, forkJoin, fromEvent, interval, map, of, take, zip, race, partition, concat, merge, expand, delay, from, groupBy, mergeMap, toArray, pairwise, scan, pluck } from 'rxjs';

@Component({
  selector: 'app-combine-transform-op',
  templateUrl: './combine-transform-op.component.html',
  styleUrls: ['./combine-transform-op.component.css']
})
export class CombineTransformOpComponent implements AfterViewInit, OnDestroy {

  @ViewChild('inp1') inp1: ElementRef | undefined
  @ViewChild('inp2') inp2: ElementRef | undefined

  constructor(private _designUtility: DesignUtilityService) { }

  addition: any = 0
  combineLatestSub: any
  combineLatestAllSub: any
  combineLatestWithSub: any
  forkJoinSub: any
  zipSub: any
  concatSub: any
  mergeSub: any
  raceSub: any
  partitionEvenSub: any
  partitionOddSub: any
  expandSub: any
  groupBySub: any
  pairwiseSub: any
  scanSub: any
  pluckSub: any

  ngAfterViewInit(): void {

    //combineLatest
    let color = of('Black', 'Red', 'Blue');
    let brand = of('Jaguar', 'Ford', 'BMW');
    let price = of(100, 200, 300);

    this.combineLatestSub = combineLatest([color, brand, price]).subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer');
    })

    //combineLatestAll
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
      map(() => of('Data')),
      take(2)
    );

    this.combineLatestAllSub = higherOrder.pipe(combineLatestAll()).subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer2');
    });

    //combineLatestWith
    this.combineLatestWithSub = fromEvent(this.inp1?.nativeElement, 'change').pipe(
      combineLatestWith(fromEvent(this.inp2?.nativeElement, 'change')),
      map(([e1, e2]: any) => Number(e1.target.value) + Number(e2.target.value))
    ).subscribe(res => {
      this.addition = res;
    })

    //forkJoin
    this.forkJoinSub = forkJoin([color, brand, price]).subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer3');
    })

    //zip
    this.zipSub = zip(color, brand, price).subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer4');
    })

    //race
    const obs1 = interval(3000).pipe(map(() => 'slow one'));
    const obs2 = interval(1000).pipe(map(() => 'fast one'));
    const obs3 = interval(2500).pipe(map(() => 'medium one'));

    this.raceSub = race(obs1, obs2, obs3).pipe(take(1))
      .subscribe(res => this._designUtility.addElement_li(res, 'elContainer5'))

    //partition
    const observableValues = of(1, 2, 3, 4, 5, 6);
    const [evens$, odds$] = partition(observableValues, value => value % 2 === 0);

    this.partitionOddSub = odds$.subscribe(res => this._designUtility.addElement_li('odd-' + res, 'elContainer6'));
    this.partitionEvenSub = evens$.subscribe(res => this._designUtility.addElement_li('even-' + res, 'elContainer6'));

    const timer1 = interval(1000).pipe(take(2), map(x => '1-' + x));
    const timer2 = interval(2000).pipe(take(3), map(x => '2-' + x));
    const timer3 = interval(500).pipe(take(3), map(x => '3-' + x));

    //concat
    this.concatSub = concat(timer1, timer2, timer3).subscribe(res => this._designUtility.addElement_li(res, 'elContainer7'));

    //merge
    this.mergeSub = merge(timer1, timer2, timer3).subscribe(res => this._designUtility.addElement_li(res, 'elContainer8'));

    //expand
    this.expandSub = fromEvent(document, 'click').pipe(
      map(() => 1),
      expand(x => of(2 * x).pipe(delay(1000))),
      take(5))
      .subscribe(res => this._designUtility.addElement_li(res, 'elContainer9'));

    //groupby
    const people = [
      { name: 'Sue', age: 25 },
      { name: 'Test', age: 25 },
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 25 },
      { name: 'Sarah', age: 35 }
    ];

    this.groupBySub = from(people).pipe(
      groupBy(x => x.age),
      mergeMap(g => g.pipe(toArray())))
      .subscribe(res => this._designUtility.addElement_li(JSON.stringify(res), 'elContainer10'));

    //pairwise
    this.pairwiseSub = fromEvent(document, 'click').pipe(pairwise()).pipe(map(([first, second]: any) => {
      const x0 = first.clientX;
      const y0 = first.clientY;
      const x1 = second.clientX;
      const y1 = second.clientY;
      return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2))
    })).subscribe(res => this._designUtility.addElement_li(res, 'elContainer11'));

    //scan
    this.scanSub = of(1, 2, 3, 4, 5)
      .pipe(scan((total, n: any) => total + n))
      .subscribe(res => this._designUtility.addElement_li(res, 'elContainer12'));

    //pluck
    var data = [
      { id: 1, name: "user1", ratings: { angular: 4, cSharp: 5 } },
      { id: 2, name: "user2", ratings: { angular: 3, cSharp: 4 } },
      { id: 3, name: "user3", ratings: { angular: 5, cSharp: 5 } },
    ]

    this.pluckSub = from(data)
      .pipe(pluck('ratings', 'angular'))
      // .pipe(map(x => x.ratings.angular))
      .subscribe(res => this._designUtility.addElement_li(res, 'elContainer13'));

  }

  ngOnDestroy(): void {
    if (this.combineLatestSub) {
      this.combineLatestSub.unsubscribe()
    }
    if (this.combineLatestAllSub) {
      this.combineLatestAllSub.unsubscribe()
    }
    if (this.combineLatestWithSub) {
      this.combineLatestWithSub.unsubscribe()
    }
    if (this.forkJoinSub) {
      this.forkJoinSub.unsubscribe()
    }
    if (this.zipSub) {
      this.zipSub.unsubscribe()
    }
    if (this.raceSub) {
      this.raceSub.unsubscribe()
    }
    if (this.partitionOddSub) {
      this.partitionOddSub.unsubscribe()
    }
    if (this.partitionEvenSub) {
      this.partitionEvenSub.unsubscribe()
    }
    if (this.concatSub) {
      this.concatSub.unsubscribe()
    }
    if (this.mergeSub) {
      this.mergeSub.unsubscribe()
    }
    if (this.expandSub) {
      this.expandSub.unsubscribe()
    }
    if (this.groupBySub) {
      this.groupBySub.unsubscribe()
    }
    if (this.pairwiseSub) {
      this.pairwiseSub.unsubscribe()
    }
    if (this.scanSub) {
      this.scanSub.unsubscribe()
    }
    if (this.pluckSub) {
      this.pluckSub.unsubscribe()
    }
  }
}
