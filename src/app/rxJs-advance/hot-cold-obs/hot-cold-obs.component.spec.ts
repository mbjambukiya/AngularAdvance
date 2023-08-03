import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotColdObsComponent } from './hot-cold-obs.component';

describe('HotColdObsComponent', () => {
  let component: HotColdObsComponent;
  let fixture: ComponentFixture<HotColdObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotColdObsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotColdObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
