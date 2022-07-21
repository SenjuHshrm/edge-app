import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss'],
})
export class CreatePurchaseOrderComponent implements OnInit {
  public pos = [
    {
      item: '',
      quantity: '',
      units: '',
      unitPrice: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleNewItem() {
    this.pos.push({
      item: '',
      quantity: '',
      units: '',
      unitPrice: '',
    });
  }

  handleSavePO(e: any) {
    e.preventDefault();
    console.log(this.pos);
  }
}
