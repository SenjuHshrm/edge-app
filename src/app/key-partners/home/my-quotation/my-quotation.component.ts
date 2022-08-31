import { ViewQuotationComponent } from 'src/app/components/modals/view-quotation/view-quotation.component';
import Swal from 'sweetalert2';
import { QuotationService } from './../../../services/quotation.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreatePurchaseOrderComponent } from 'src/app/components/modals/create-purchase-order/create-purchase-order.component';

@Component({
  selector: 'app-my-quotation',
  templateUrl: './my-quotation.component.html',
  styleUrls: ['./my-quotation.component.scss'],
})
export class MyQuotationComponent implements OnInit {
  forApproval: any = [];
  pending: any = [];

  constructor(private mdCtrl: NgbModal, private quote: QuotationService) {}

  ngOnInit(): void {
    this.quote.getQuotationByKeyPartnerId().subscribe({
      next: (res: any) => {
        this.forApproval = res.info.filter((x: any) => x.status === 'none');
        this.pending = res.info.filter((x: any) => x.status === 'pending');
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  createQuotation(data: any) {
    let createPO: NgbModalRef = this.mdCtrl.open(CreatePurchaseOrderComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    createPO.componentInstance.data = data;
  }

  viewQuotation(data: any) {
    let viewQuote: NgbModalRef = this.mdCtrl.open(ViewQuotationComponent, {
      size: 'xl',
      fullscreen: 'lg',
    });
    viewQuote.componentInstance.data = data;
  }

  markAsPending(id: string) {
    this.quote.markAsPending(id).subscribe({
      next: (res: any) => {
        Swal.fire('Success', 'Quotation marked as pending', 'success');
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }
}
