import { InquiryService } from './../../../services/inquiry.service';
import { ViewInquiryComponent } from './../../../components/modals/view-inquiry/view-inquiry.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateQuotationComponent } from 'src/app/components/modals/create-quotation/create-quotation.component';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
})
export class InquiryListComponent implements OnInit {
  public inqList: any = [];

  constructor(private mdCtrl: NgbModal, private inq: InquiryService) {}

  ngOnInit(): void {
    this.inq.getAllInquiries().subscribe({
      next: (res: any) => {
        this.inqList = res.info;
      },
    });
  }

  viewInquiry(inq: any) {
    let viewInq: NgbModalRef = this.mdCtrl.open(ViewInquiryComponent, {
      size: 'xl',
    });
    viewInq.componentInstance.data = inq;
  }

  createQuotation(inq: any) {
    let createQuote: NgbModalRef = this.mdCtrl.open(CreateQuotationComponent, {
      size: 'xl',
    });
    createQuote.componentInstance.data = inq;
  }
}
