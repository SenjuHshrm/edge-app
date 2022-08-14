import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  @Input() public data: any;

  constructor() {}

  ngOnInit(): void {}

  handleDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }

  handleMoney(amount: any): string {
    return Number(Number(amount).toFixed(2)).toLocaleString();
  }
}
