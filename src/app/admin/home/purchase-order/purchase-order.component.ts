import { PurchaseOrderService } from './../../../services/purchase-order.service';
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
  public poLs: any = [];

  constructor(private mdCtrl: NgbModal, private po: PurchaseOrderService) {}

  ngOnInit(): void {
    this.po.getAllPurchaseOrder().subscribe({
      next: (res: any) => {
        this.poLs = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  createPurchaseOrder() {
    let createPO = this.mdCtrl.open(CreatePurchaseOrderComponent, {
      size: 'xl',
    });
  }

  viewPurchaseOrder(data: any) {
    let viewPO = this.mdCtrl.open(ViewPurchaseOrderComponent, {
      size: 'xl',
      fullscreen: 'lg',
    });
    viewPO.componentInstance.data = data;
  }
}
