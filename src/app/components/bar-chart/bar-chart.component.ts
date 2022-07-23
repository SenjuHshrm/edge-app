import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  series: ApexAxisChartSeries = [
    {
      name: 'My-series',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  chart: ApexChart = {
    height: 500,
    type: 'bar',
  };

  constructor() {}

  ngOnInit(): void {}
}
