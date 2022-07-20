import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPurchaseOrderComponent } from 'src/app/components/modals/view-purchase-order/view-purchase-order.component';
import { CreatePurchaseOrderComponent } from 'src/app/components/modals/create-purchase-order/create-purchase-order.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit {
  constructor(private mdCtrl: NgbModal) {}

  ngOnInit(): void {}

  createPurchaseOrder() {
    let createPO = this.mdCtrl.open(CreatePurchaseOrderComponent, {
      size: 'xl',
    });
  }

  viewPurchaseOrder() {
    let viewPO = this.mdCtrl.open(ViewPurchaseOrderComponent, { size: 'xl' });
    viewPO.componentInstance.data = {};
  }
}
