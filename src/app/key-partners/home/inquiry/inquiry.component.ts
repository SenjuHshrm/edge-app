import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateInquiryComponent } from 'src/app/components/modals/create-inquiry/create-inquiry.component';
import { ViewInquiryComponent } from 'src/app/components/modals/view-inquiry/view-inquiry.component';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit {
  constructor(private mdCtrl: NgbModal) {}

  ngOnInit(): void {}

  createNewInquiry() {
    let createInq = this.mdCtrl.open(CreateInquiryComponent, { size: 'xl' });
  }

  viewInquiry() {
    let viewInq = this.mdCtrl.open(ViewInquiryComponent);
  }
}
