import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { of } from 'rxjs';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private valueService: ValueService) { }

  getData() {
    var dataObj = [{ id: 11, name: 'TEST' }]
    return dataObj
  }

  getObservableData() {
    var dataObj = [{ id: 11, name: 'TEST' }]
    return of(dataObj)
  }

  getValue() {
    return this.valueService.getValue()
  }
}