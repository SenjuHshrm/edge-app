import { BookingService } from './../../services/booking.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnDestroy {
  public title: any = {
    text: 'Booking',
  };
  public currMonth: string = ''

  public series: any = [
    {
      name: '',
      data: [],
    },
  ];

  public chart: any = {
    type: 'bar',
    width: '100%',
    height: 500,
  };

  public xaxis: any = {
    categories: [],
  };

  private subs: Subscription= new Subscription();

  constructor(private booking: BookingService) {}

  ngOnInit(): void {
    this.currMonth = moment().format('MMMM')
    let params: any = {
      start: moment().startOf('month').toISOString(),
      end: moment().endOf('month').toISOString(),
    };
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string);
    let getBooking = (token.access === 1) ? this.booking.getCurrentMonthBookingCount(params).subscribe({
        next: (res: any) => this.initializeChart(res.info),
        error: ({ error }: any) => console.log(error),
      }) : this.booking
      .getCurrentMonthBookingCountByKeyPartner({ ...params, id: token.sub })
      .subscribe({
        next: (res: any) => this.initializeChart(res.info),
        error: ({ error }: any) => console.log(error),
      });
    this.subs.add(getBooking)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  private initializeChart(data: number[]) {
    let days = [];
    for (let i = 0; i < moment().daysInMonth(); i++) {
      days.push(i + 1);
    }
    this.title = {
      text: 'Booking',
    };

    this.series = [
      {
        name: '',
        data: data,
      },
    ];

    this.chart = {
      type: 'bar',
      width: '100%',
      height: 500,
    };

    this.xaxis = {
      categories: days,
    };
  }
}
