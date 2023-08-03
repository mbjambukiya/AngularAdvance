import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderObsComponent } from './higher-order-obs.component';

describe('HigherOrderObsComponent', () => {
  let component: HigherOrderObsComponent;
  let fixture: ComponentFixture<HigherOrderObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherOrderObsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherOrderObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
