import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from '../../services/data.service';
import { MockDataService } from '../../services/mock-data.service';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
      providers: [{ provide: DataService, useClass: MockDataService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as name 'test'`, () => {
    expect(component.name).toEqual('test');
  });

  it('increment', () => {
    component!.increment(2)
    expect(component!.count).toEqual(12)
  })

  it('test spy', () => {
    spyOn(component, 'testSpyMethod')
    component.testSpyMethod()
    expect(component.testSpyMethod).toHaveBeenCalled();
  })

  it('mock test', () => {
    var testService = TestBed.get(DataService);
    expect(testService.getData()).toEqual('mock data')
  })

  it('set textbox value - done with whenStable', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textBox');
      element.value = 'updated value';
      element.dispatchEvent(new Event('input'));
      expect(element.value).toEqual(component.textBoxVal);
      done();
    })
  })

  it('set textbox value - async with whenStable', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textBox');
      element.value = 'updated value';
      element.dispatchEvent(new Event('input'));
      expect(element.value).toEqual(component.textBoxVal);
    })
  }))

  it('set textbox value - fakeAsync with tick', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textBox');
    element.value = 'updated value';
    element.dispatchEvent(new Event('input'));
    expect(element.value).toEqual(component.textBoxVal);
  }))


});
