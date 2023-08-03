import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineTransformOpComponent } from './combine-transform-op.component';

describe('CombineTransformOpComponent', () => {
  let component: CombineTransformOpComponent;
  let fixture: ComponentFixture<CombineTransformOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombineTransformOpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombineTransformOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
