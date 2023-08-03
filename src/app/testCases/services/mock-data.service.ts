import { Injectable } from '@angular/core';
import { ValueService } from './value.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private valueService: ValueService) { }

  getData() {
    return 'mock data'
  }

  getObservableData() {
    var dataObj = [{ id: 11, name: 'TEST' }]
    return of(dataObj)
  }

  getValue() {
    return this.valueService.getValue()
  }
}
