import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePurchaseOrderComponent } from 'src/app/components/modals/create-purchase-order/create-purchase-order.component';

@Component({
  selector: 'app-my-quotation',
  templateUrl: './my-quotation.component.html',
  styleUrls: ['./my-quotation.component.scss'],
})
export class MyQuotationComponent implements OnInit {
  tableDatas: any = [, , , ,];
  constructor(private mdCtrl: NgbModal) {}

  ngOnInit(): void {}

  createQuotation() {
    let createQuot = this.mdCtrl.open(CreatePurchaseOrderComponent, {
      size: 'xl',
    });
  }
}
