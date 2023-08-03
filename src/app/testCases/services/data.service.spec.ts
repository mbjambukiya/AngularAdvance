import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { ValueService } from './value.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData should return data', () => {
    var dataObj = [{ id: 11, name: 'TEST' }]
    expect(service.getData()).toEqual(dataObj);
  });

  it('getObservableData should return observable data', () => {
    var dataObj = [{ id: 11, name: 'TEST' }]
    service.getObservableData().subscribe(data => {
      expect(data).toEqual(dataObj);
    })
  });

  it(`getValue should return 'value' from the value service`, () => {
    service = new DataService(new ValueService());
    expect(service.getValue()).toBe('value');
  });

});