import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  public title: any = {
    text: 'Booking'
  }

  public series: any = [{
    name: '',
    data: []
  }]

  public chart: any = {
    type: 'bar',
    width: '100%',
    height: 500
  }

  public xaxis: any = {
    categories: []
  }

  constructor(
    private booking: BookingService
  ) {
    
  }

  ngOnInit(): void {
    let params: any = {
      start: moment().startOf('month').toISOString(),
      end: moment().endOf('month').toISOString()
    }
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    console.log(params)
    if(token.access === 1) {
      this.booking.getCurrentMonthBookingCount(params).subscribe({
        next: (res: any) => this.initializeChart(res.info),
        error: ({ error }: any) => console.log(error)
      })
    } else {
      this.booking.getCurrentMonthBookingCountByKeyPartner({ ...params, id: token.sub }).subscribe({
        next: (res: any) => this.initializeChart(res.info),
        error: ({ error }: any) => console.log(error)
      })
    }
  }

  private initializeChart(data: number[]) {
    let days = []
    for(let i = 0; i < moment().daysInMonth(); i++) {
      days.push(i+1)
    }
    this.title = {
      text: 'Booking'
    }
  
    this.series = [{
      name: '',
      data: data
    }]
  
    this.chart = {
      type: 'bar',
      width: '100%',
      height: 500
    }
  
    this.xaxis = {
      categories: days
    }
  }
}
