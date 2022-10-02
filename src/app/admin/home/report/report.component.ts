import { ReportService } from './../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public currMonth: string = ''
  public todaysReport: any = {
    bookings: 0,
    quotations: 0,
    po: 0
  }

  constructor(
    private rep: ReportService
  ) { }

  ngOnInit(): void {
    this.currMonth = moment().format('MMMM')
    let currDateStart = moment().startOf('day').toISOString(),
        currDateEnd = moment().endOf('day').toISOString()
    this.rep.getTodaysReport(currDateStart, currDateEnd).subscribe({
      next: (res: any) => {
        this.todaysReport = { ...res.info }
      }
    })
  }

}
