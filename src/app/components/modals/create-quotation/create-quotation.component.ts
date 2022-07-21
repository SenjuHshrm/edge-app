import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss'],
})
export class CreateQuotationComponent implements OnInit {
  public quotations = [
    {
      item: '',
      unitPrice: '',
      quantity: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

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
}
