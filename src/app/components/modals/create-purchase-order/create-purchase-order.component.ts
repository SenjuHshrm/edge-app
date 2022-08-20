import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss'],
})
export class CreatePurchaseOrderComponent implements OnInit {

  @Input() public data: any;
  public quotations: any = [];
  public itemPlaceholder: any= []
  public items: any = []
  public poData: any = {
    itemId: '',
    description: '',
    unitPrice: '',
    quantity: '',
    totalPrice: ''
  }

  constructor() {}

  ngOnInit(): void {
    this.data.items.forEach((x: any) => {
      this.items.push(x)
    })
  }

  displayInfo(id: string) {
    let item = this.items.filter((i: any) => { return i._id === id })
    this.poData = {
      itemId: item[0]._id,
      description: item[0].description,
      unitPrice: item[0].units
    }
  }

}
