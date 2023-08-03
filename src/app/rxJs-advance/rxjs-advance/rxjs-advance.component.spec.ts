import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsAdvanceComponent } from './rxjs-advance.component';

describe('RxjsAdvanceComponent', () => {
  let component: RxjsAdvanceComponent;
  let fixture: ComponentFixture<RxjsAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsAdvanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
