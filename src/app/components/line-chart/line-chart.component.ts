import { ReportService } from './../../services/report.service';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ApexAxisChartSeries, ApexChart } from 'ng-apexcharts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  public title: any = {
    text: 'Booking',
  };
  public series: ApexAxisChartSeries = [
    {
      name: '',
      data: [],
    },
  ];
  public chart: ApexChart = {
    height: 500,
    width: '100%',
    type: 'line',
  };
  public xaxis: any = {
    categories: [],
  };

  @Input() public graphtype: string = '';

  private subs: Subscription = new Subscription()

  constructor(
    private booking: BookingService,
    private report: ReportService
  ) {}

  ngOnInit(): void {
    let params: any = {
      start: moment().startOf('month').toISOString(),
      end: moment().endOf('month').toISOString(),
    };
    switch(this.graphtype) {
      case 'daily-sales':
        this.dailySalesData(params)
        break;
      case 'daily-quotations':
        this.dailyQuotationsData(params)
        break;
      case 'daily-purchase-orders':
        this.dailyPurchaseOrdersData(params)
        break;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()  
  }

  dailySalesData(params: any) {
    let getCurrentMonthBookingCount = this.booking.getCurrentMonthBookingCount(params).subscribe({
      next: (res: any) => this.initializeChart(res.info, 'Daily Sales'),
      error: ({error}: any) => console.log(error)
    })
    this.subs.add(getCurrentMonthBookingCount)
  }

  dailyQuotationsData(params: any) {
    let getMonthlyQuotations = this.report.getMonthlyQuotations(params).subscribe({
      next: (res: any) => this.initializeChart(res.info, 'Daily Number of Quotations'),
      error: ({error}: any) => console.log(error)
    })
    this.subs.add(getMonthlyQuotations)
  }

  dailyPurchaseOrdersData(params: any) {
    let getMonthlyPO = this.report.getMonthlyPO(params).subscribe({
      next: (res: any) => this.initializeChart(res.info, 'Daily Number of Purchase Orders'),
      error: ({error}: any) => console.log(error)
    })
    this.subs.add(getMonthlyPO)
  }

  initializeChart(data: number[], title: string) {
    let days = []
    for(let i = 0; i < moment().daysInMonth(); i++) {
      days.push(i + 1)
    }
    this.title = { text: title }
    this.series = [{ name: '', data: data }]
    this.chart = { type: 'line', width: '100%', height: 500 }
    this.xaxis = { categories: days }
  }
}
