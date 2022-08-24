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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  // series: ApexAxisChartSeries = [
  //   {
  //     name: 'My-series',
  //     data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  //   },
  // ];
  // chart: ApexChart = {
  //   height: 500,
  //   width: '100%',
  //   type: 'bar',
  // };

  public chartOptions: ChartOptions = {
    series: [{  name: '', data: []}],
    chart: { height: 0, width: '', type: 'bar' },
    title: { text: '' },
    xaxis: { categories: [] }
  };

  constructor(
    private booking: BookingService
  ) {
    let days = []
    for(let i = 0; i < moment().daysInMonth(); i++) {
      days.push((i+1).toString())
    }
    this.chartOptions = {
      series: [
        {
          name: 'Booking',
          data: []
        }
      ],
      chart: {
        height: 500,
        width: '100%',
        type: 'bar',
      },
      title: {
        text: 'Booking'
      },
      xaxis: {
        categories: days
      }
    }
  }

  ngOnInit(): void {
    
  }
}
