import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bundle',
  templateUrl: './view-bundle.component.html',
  styleUrls: ['./view-bundle.component.scss'],
})
export class ViewBundleComponent implements OnInit {
  @Input() public data: any;

  public total = 0;

  constructor() {}

  ngOnInit(): void {
    this.data?.items.map((item: any) => {
      this.total += parseFloat(item.price) * parseFloat(item.quantity);
    });
  }

  handleMoney(amount: any): any {
    return Number(Number(amount).toFixed(2)).toLocaleString();
  }
}
