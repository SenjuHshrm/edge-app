import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss'],
})
export class CreateQuotationComponent implements OnInit {

  @Input() public data: any = {}
  public quotations: any = [];
  public quoteData: any = {
    itemId: '',
    description: '',
    unitPrice: '',
    quantity: '',
    markUp: '',
    totalPrice: ''
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.data)
  }

  handleNewItem() {
    this.quotations.push({
      item: '',
      unitPrice: '',
      quantity: '',
    });
  }

  handleSaveQuotation(e: any) {
    e.preventDefault();
    console.log(this.quotations);
  }

  addQuotation(item: any) {
    console.log(item)
  }
}
