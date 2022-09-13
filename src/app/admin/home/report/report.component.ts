import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public currMonth: string = ''

  constructor() { }

  ngOnInit(): void {
    this.currMonth = moment().format('MMMM')
  }

}
