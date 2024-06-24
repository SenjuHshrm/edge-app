import { LogsService } from './../../../services/logs.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {

  public maxDate: any = new Date().toISOString().substring(0, 10)
  public selectedDate: any = new Date().toISOString().substring(0, 10);
  public logs: any = []

  private _sub: Subscription = new Subscription()

  constructor(
    private _log: LogsService
  ) { }

  ngOnInit(): void {
    this._getLogs(moment(this.selectedDate, 'YYYY-MM-DD').format('MM-DD-YYYY'))
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public getLogsByDate() {
    this._getLogs(moment(this.selectedDate, 'YYYY-MM-DD').format('MM-DD-YYYY'))
  }

  private _getLogs(date: string) {
    this.logs = []
    this._sub.add(this._log.getLogsByDate(date).subscribe({
      next: (res: any) => {
        res.forEach((r: any) => {
          this.logs.push({
            ...r,
            date: moment(r.date, 'MM-DD-YYYY hh:mm:ss a').format('MMM D, YYYY - hh:mm:ss a')
          })
        })
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

}
