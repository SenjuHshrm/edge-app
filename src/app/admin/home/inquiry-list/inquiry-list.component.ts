import { ViewInquiryComponent } from './../../../components/modals/view-inquiry/view-inquiry.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateQuotationComponent } from 'src/app/components/modals/create-quotation/create-quotation.component';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
})
export class InquiryListComponent implements OnInit {
  constructor(private mdCtrl: NgbModal) {}

  ngOnInit(): void {}

  viewInquiry() {
    let viewInq = this.mdCtrl.open(ViewInquiryComponent, { size: 'xl' });
    viewInq.componentInstance.data = {};
  }

  createQuotation() {
    let createQuote = this.mdCtrl.open(CreateQuotationComponent, {
      size: 'lg',
    });
  }
}
