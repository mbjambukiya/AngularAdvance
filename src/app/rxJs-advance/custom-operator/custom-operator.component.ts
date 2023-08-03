import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ObservableInput, OperatorFunction, debounceTime, delay, distinctUntilChanged, fromEvent, map, mergeMap, of, pipe, switchMap } from 'rxjs';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-custom-operator',
  templateUrl: './custom-operator.component.html',
  styleUrls: ['./custom-operator.component.css']
})
export class CustomOperatorComponent implements AfterViewInit {

  @ViewChild('inp1') inp1: ElementRef | undefined

  constructor(private _designUtility: DesignUtilityService) { }

  ngAfterViewInit(): void {

    //source - keyup event on input
    const source3$ = fromEvent(this.inp1?.nativeElement, 'keyup').pipe(
      map((x: any) => x.target.value))

    //data producer type
    type DataProducer<T> = (q: string) => ObservableInput<T>;

    //custom operator function
    function liveSearch<R>(time: number, dataProducer: DataProducer<R>): OperatorFunction<string, R> {
      return pipe(
        debounceTime(time),
        distinctUntilChanged(),
        switchMap(dataProducer)
        // mergeMap(dataProducer)
      );
    }

    //data producer function
    const newsProducer = (q: string) =>
      // of(`Results for ${q}`).pipe();
      of(`Results for ${q}`).pipe(delay(1000));

    //using custom operator
    const result3$ = source3$.pipe(liveSearch(500, newsProducer));
    result3$.subscribe(res => {
      this._designUtility.addElement_li(res, 'elContainer')
    });

  }
}