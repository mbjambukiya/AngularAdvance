import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarbleTestingComponent } from './marble-testing.component';
import { TestScheduler } from 'rxjs/testing';
import { concat, concatMap, delay, of, throttleTime } from 'rxjs';

describe('MarbleTestingComponent', () => {
  let component: MarbleTestingComponent;
  let fixture: ComponentFixture<MarbleTestingComponent>;
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarbleTestingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MarbleTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marble-test-1', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('-a-b-c|');
      const expected = '-a-b-c|';

      expectObservable(source$).toBe(expected);
    });
  });

  it('marble-test-2 (with values)', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('-a-b-c|', { a: 1, b: 2, c: 3 });
      const expected = '-a-b-c|';

      expectObservable(source$).toBe(expected, { a: 1, b: 2, c: 3 });
    });
  });

  it('marble-test-3 (concatMap, of and delay)', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold('-a-b-c|');
      const final$ = source$.pipe(concatMap(val => of(val).pipe(delay(100))));
      const expected = '- 100ms a 99ms b 99ms (c|)';

      expectObservable(final$).toBe(expected);
    });
  });

  it('marble-test-4 (hot observable)', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers;
      const source$ = hot('-a-b-c-d-^-e|');
      const expected = '--e|';

      expectObservable(source$).toBe(expected);
    });
  });

  it('marble-test-5 (subscriptions)', () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const source1$ = cold('-a-b-c|');
      const source2$ = cold('-d-e-f|');
      const final$ = concat(source1$, source2$);
      const expected = '-a-b-c-d-e-f|';
      const expectedSubscriptionsSource1 = '^-----!';
      const expectedSubscriptionsSource2 = '------^-----!';

      expectObservable(final$).toBe(expected);
      expectSubscriptions(source1$.subscriptions).toBe(expectedSubscriptionsSource1);
      expectSubscriptions(source2$.subscriptions).toBe(expectedSubscriptionsSource2);
    });
  });

  it('marble-test-6 (throttleTime)', () => {
    testScheduler.run((helpers) => {
      const { cold, time, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold(' -a--b--c---|');
      const e1subs = '  ^----------!';
      const t = time('   ---|       '); // t = 3
      const expected = '-a-----c---|';

      expectObservable(e1.pipe(throttleTime(t))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it(`marble-test-7`, () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const expected = '400ms (a-b|)';
      const values = {
        a: 'value emitted',
        b: 'another value emitted',
      };
      const someStreamForTesting = of(values.a, values.b).pipe(delay(400));

      expectObservable(someStreamForTesting).toBe(expected, values);
    })
  })

  it(`marble-test-8`, () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const input = ' -a-b-c|';
      const expected = '-- 9ms a 9ms b 9ms (c|)';
      const result = cold(input).pipe(
        concatMap((d) => of(d).pipe(
          delay(10)
        ))
      );
      
      expectObservable(result).toBe(expected);
    })
  })

});
