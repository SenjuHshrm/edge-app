import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateInquiryComponent } from 'src/app/components/modals/create-inquiry/create-inquiry.component';
import { ViewInquiryComponent } from 'src/app/components/modals/view-inquiry/view-inquiry.component';
import { InquiryService } from 'src/app/services/inquiry.service';
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit {
  public inquiryList: any = [];

  constructor(private mdCtrl: NgbModal, private inq: InquiryService) {}

  ngOnInit(): void {
    this.inq.getInquiries().subscribe({
      next: (res) => {
        res.info.map((i: any) => {
          // i.createdAt = moment(i.createdAt).format('MM/DD/YYYY, hh:mm a')
          this.inquiryList.push(i);
        });
      },
      error: (e) => {
        console.log(e);
        if (e.status === 401) {
        }
      },
    });
  }

  createNewInquiry() {
    let createInq = this.mdCtrl.open(CreateInquiryComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    createInq.result.then((res) => {
      if (res) {
        this.inquiryList = [res, ...this.inquiryList];
      }
    });
  }

  viewInquiry(data: any) {
    let viewInq: NgbModalRef = this.mdCtrl.open(ViewInquiryComponent, {
      size: 'xl',
    });
    viewInq.componentInstance.data = data;
    viewInq.result.then((result) => {}).catch(() => console.log());
  }
}
