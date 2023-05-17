import { ReportService } from './../../../services/report.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  public currMonth: string = ''
  public todaysReport: any = {
    bookings: 0,
    quotations: 0,
    po: 0
  }

  private subs: Subscription = new Subscription()

  constructor(
    private rep: ReportService
  ) { }

  ngOnInit(): void {
    this.currMonth = moment().format('MMMM')
    let currDateStart = moment().startOf('day').toISOString(),
        currDateEnd = moment().endOf('day').toISOString()
    let getTodaysReport = this.rep.getTodaysReport(currDateStart, currDateEnd).subscribe({
      next: (res: any) => {
        this.todaysReport = { ...res.info }
      }
    })
    this.subs.add(getTodaysReport)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
