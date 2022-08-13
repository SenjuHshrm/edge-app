import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuotationService } from './../../../services/quotation.service';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss'],
})
export class CreateQuotationComponent implements OnInit {

  @Input() public data: any = {}
  public quotations: any = [];
  public itemPlaceholder: any= []
  public items: any = []
  public quoteData: any = {
    itemId: '',
    description: '',
    unitPrice: '',
    quantity: '',
    totalPrice: ''
  }

  constructor(
    private quote: QuotationService,
    private md: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.data.items.forEach((x: any) => {
      this.items.push(x)
    })
  }

  displayInfo(id: string) {
    let item = this.items.filter((i: any) => {return i._id === id})
    this.quoteData = {
      itemId: item[0]._id,
      description: item[0].description,
      unitPrice: item[0].units,
      quantity: item[0].quantity,
      totalPrice: item[0].quantity * (+item[0].units + (+item[0].units * 0.15))
    }
  }

  computeTotalPrice() {
    this.quoteData.totalPrice = this.quoteData.quantity * (+this.quoteData.unitPrice + (+this.quoteData.unitPrice * 0.15))
  }

  handleSaveQuotation(e: any) {
    e.preventDefault();
    let req = {
      keyPartnerId: this.data.keyPartnerId._id,
      quoteFrom: this.data.inqId,
      items: this.quotations,
      validUntil: moment().add(30, 'days').format()
    }
    this.quote.createQuotation(req).subscribe({
      next: (res: any) => {
        console.log(res)
        this.md.close(res.info)
      },
      error: (e: any) => {
        console.log(e)
      }
    })
  }

  addQuotation(item: any) {
    this.quotations.push(item)
    let i = this.items.findIndex((x: any) => x._id === item.itemId)
    this.itemPlaceholder.push(this.items[i])
    this.items.splice(i, 1)
    this.quoteData = {
      itemId: '',
      description: '',
      unitPrice: '',
      quantity: '',
      totalPrice: ''
    }
  }

  removeFromList(i: number) {
    let ind = this.itemPlaceholder.findIndex((x: any) => x._id === this.quotations[i].itemId)
    this.items.push(this.itemPlaceholder[ind])
    this.quotations.splice(i, 1)
  }
}
