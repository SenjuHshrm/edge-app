import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-inquiry',
  templateUrl: './create-inquiry.component.html',
  styleUrls: ['./create-inquiry.component.scss'],
})
export class CreateInquiryComponent implements OnInit {
  public inquiry = [
    {
      description: '',
      quantity: '',
      units: '',
      remarks: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleNewItem() {
    this.inquiry.push({
      description: '',
      quantity: '',
      units: '',
      remarks: '',
    });
  }

  handleSaveInquiry(e: any) {
    e.preventDefault();
    console.log(this.inquiry);
  }
}
