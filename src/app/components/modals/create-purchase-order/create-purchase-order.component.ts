import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderService } from './../../../services/purchase-order.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss'],
})
export class CreatePurchaseOrderComponent implements OnInit {

  @Input() public data: any;
  public pos: any = [];
  public itemPlaceholder: any= []
  public items: any = []
  public poData: any = {
    itemId: '',
    description: '',
    units: '',
    unitPrice: '',
    quantity: '',
    totalPrice: ''
  }

  constructor(
    private po: PurchaseOrderService,
    private md: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.data.items.forEach((x: any) => {
      this.items.push(x)
    })
    console.log(this.data)
  }

  displayInfo(id: string) {
    let item = this.items.filter((i: any) => { return i._id === id })
    this.poData = {
      itemId: item[0]._id,
      description: item[0].description,
      units: '',
      unitPrice: item[0].unitPrice,
      quantity: item[0].quantity,
      totalPrice: +item[0].quantity * +item[0].unitPrice
    }
  }

  computeTotalPrice() {
    this.poData.totalPrice = this.poData.quantity * +this.poData.unitPrice
  }

  handleSavePO() {
    let req = {
      keyPartnerId: this.data.keyPartnerId._id,
      poFrom: this.data.quotationId,
      items: this.pos
    }
    this.po.createPurchaseOrder(req).subscribe({
      next: (res: any) => {
        this.md.close(res.info)
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

  addPO(item: any) {
    if(item.itemId !== '') {
      this.pos.push(item)
      let i = this.items.findIndex((x: any) => x._id, item.itemId)
      this.itemPlaceholder.push(this.items[i])
      this.items.splice(i, 1)
      this.poData = {
        itemId: '',
        description: '',
        units: '',
        unitPrice: '',
        quantity: '',
        totalPrice: ''
      }
    }
  }

  removeFromList(i: number) {
    let ind = this.itemPlaceholder.findIndex((x: any) => x._id === this.pos[i].itemId)
    this.items.push(this.itemPlaceholder[ind])
    this.pos.splice(i, 1)
  }


}
