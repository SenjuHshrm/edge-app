import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuotationComponent } from 'src/app/components/modals/view-quotation/view-quotation.component';
import { CreateQuotationComponent } from 'src/app/components/modals/create-quotation/create-quotation.component';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {

  constructor(
    private mdCtrl: NgbModal
  ) { }

  ngOnInit(): void {
  }

  viewQuotation() {
    let viewQuot = this.mdCtrl.open(ViewQuotationComponent)
    viewQuot.componentInstance.data = {}
  }

  createQuotation() {
    let createQuot = this.mdCtrl.open(CreateQuotationComponent)
  }

}
