import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dataService: DataService) { }

  name = 'test'
  count = 10
  textBoxVal = ''

  increment(num: number): any {
    this.count = this.count + num
  }

  testSpyMethod() {

  }

  getDataFromService() {
    this.dataService.getData()
  }

}
