import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';
import { Observable, connectable, filter, interval, map, merge, of, publish, share, shareReplay, take, tap } from 'rxjs';

@Component({
  selector: 'app-multicasting',
  templateUrl: './multicasting.component.html',
  styleUrls: ['./multicasting.component.css']
})
export class MulticastingComponent implements OnInit, OnDestroy {
  constructor(private _designUtility: DesignUtilityService) { }

  sub: any
  sub2: any
  sub3: any
  sub4: any
  sub5: any
  sub6: any
  sub7: any
  sub8: any

  ngOnInit(): void {

    //unicast
    const source$ = new Observable<number>((observer) => {
      this._designUtility.addElement_li('Source Observable created', 'elContainer')
      let count = 0;
      setInterval(() => {
        observer.next(count++);
      }, 1000);
    }).pipe(take(5));


    this.sub = source$.subscribe((value) => {
      this._designUtility.addElement_li(`Subscriber 1: ${value}`, 'elContainer')
    });

    setTimeout(() => {
      this.sub2 = source$.subscribe((value) => {
        this._designUtility.addElement_li(`Subscriber 2: ${value}`, 'elContainer')
      });
    }, 3000);

    //share
    const source2$ = new Observable<number>((observer) => {
      this._designUtility.addElement_li('Source Observable created', 'elContainer2')
      let count = 0;
      setInterval(() => {
        observer.next(count++);
      }, 1000);
    }).pipe(take(5), share());


    this.sub3 = source2$.subscribe((value) => {
      this._designUtility.addElement_li(`Subscriber 1: ${value}`, 'elContainer2')
    });

    setTimeout(() => {
      this.sub4 = source2$.subscribe((value) => {
        this._designUtility.addElement_li(`Subscriber 2: ${value}`, 'elContainer2')
      });
    }, 3000);

    //publish & connect
    const source3$ = publish()(
      interval(1000).pipe(
        take(5),
        tap(() => this._designUtility.addElement_li("Do Something!", 'elContainer3'))
      )
    );

    const sub5 = source3$.subscribe(val =>
      this._designUtility.addElement_li(`Subscriber One: ${val}`, 'elContainer3')
    );

    const sub6 = source3$.subscribe(val =>
      this._designUtility.addElement_li(`Subscriber Two: ${val}`, 'elContainer3')
    );

    setTimeout(() => {
      source3$.connect();
    }, 3000);

    //ShareReplay
    const source4$ = new Observable<number>((observer) => {
      this._designUtility.addElement_li('Source Observable created', 'elContainer4')
      let count = 0;
      setInterval(() => {
        observer.next(count++);
      }, 1000);
    }).pipe(take(5), shareReplay(3));


    this.sub7 = source4$.subscribe((value) => {
      this._designUtility.addElement_li(`Subscriber 1: ${value}`, 'elContainer4')
    });

    setTimeout(() => {
      this.sub8 = source4$.subscribe((value) => {
        this._designUtility.addElement_li(`Subscriber 2: ${value}`, 'elContainer4')
      });
    }, 3000);

    //Connect & Connectable
    const source5$ = of(1, 2, 3, 4, 5);
    const connectableObs$ = connectable(source5$);

    const even$ = connectableObs$.pipe(
      filter((n) => n % 2 === 0),
      map((n) => `even ${n}`)
    );

    const odd$ = connectableObs$.pipe(
      filter((n) => n % 2 === 1),
      map((n) => `odd ${n}`)
    );

    merge(even$, odd$).subscribe((value) => {
      this._designUtility.addElement_li(value, 'elContainer5')
    });


    setTimeout(() => {
      this._designUtility.addElement_li('connected', 'elContainer5')
      connectableObs$.connect();
    }, 2000);
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
    if (this.sub5) {
      this.sub5.unsubscribe()
    }
    if (this.sub6) {
      this.sub6.unsubscribe()
    }
    if (this.sub7) {
      this.sub7.unsubscribe()
    }
    if (this.sub8) {
      this.sub8.unsubscribe()
    }
  }
}
