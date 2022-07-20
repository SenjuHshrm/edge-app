import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.scss']
})
export class ViewPurchaseOrderComponent implements OnInit {

  @Input() public data: any | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
