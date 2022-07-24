import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  series: ApexAxisChartSeries = [
    {
      name: 'My-series',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  chart: ApexChart = {
    height: 500,
    width: '100%',
    type: 'line',
  };

  constructor() {}

  ngOnInit(): void {}
}
