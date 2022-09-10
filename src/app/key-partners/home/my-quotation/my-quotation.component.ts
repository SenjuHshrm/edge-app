import { ViewQuotationComponent } from 'src/app/components/modals/view-quotation/view-quotation.component';
import Swal from 'sweetalert2';
import { QuotationService } from './../../../services/quotation.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreatePurchaseOrderComponent } from 'src/app/components/modals/create-purchase-order/create-purchase-order.component';
import { ExportComponent } from 'src/app/components/modals/export/export.component';

@Component({
  selector: 'app-my-quotation',
  templateUrl: './my-quotation.component.html',
  styleUrls: ['./my-quotation.component.scss'],
})
export class MyQuotationComponent implements OnInit {
  forApproval: any = [];
  pending: any = [];
  public allApproval: any = [];
  public allPending: any = [];
  public aSearch: string = '';
  public pSearch: string = '';

  constructor(private mdCtrl: NgbModal, private quote: QuotationService) {}

  ngOnInit(): void {
    this.quote.getQuotationByKeyPartnerId().subscribe({
      next: (res: any) => {
        this.forApproval = res.info.filter((x: any) => x.status === 'none');
        this.allApproval = res.info.filter((x: any) => x.status === 'none');
        this.pending = res.info.filter((x: any) => x.status === 'pending');
        this.allPending = res.info.filter((x: any) => x.status === 'pending');
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

  setStatusForApproval(id: string, status: string) {
    this.quote.setStatus(id, status).subscribe({
      next: (res: any) => {
        let msg: string = ''
        let ind = this.forApproval.findIndex((i: any) => i._id === id)
        switch(status) {
          case "pending":
            msg = 'Quotation marked as pending'
            this.pending.push(this.forApproval[ind])
            this.forApproval.splice(ind, 1)
            break;
          case "declined":
            msg = 'Quotation declined'
            this.forApproval.splice(ind, 1)
            break;
        }
        Swal.fire({
          text: msg,
          icon: 'success',
        });
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  setStatusForPending(id: string, status: string) {
    this.quote.setStatus(id, status).subscribe({
      next: (res: any) => {
        let ind = this.pending.findIndex((i: any) => i._id === id)
        this.pending.splice(ind, 1)
        Swal.fire({
          text: 'Quotation declined',
          icon: 'success',
        });
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  handleSelectAll(evt: any) {
    const checks: any = document.getElementsByClassName(
      'custom-check-me-approval'
    );
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked ? true : false;
      }
    }
  }

  handleSelectAllPending(evt: any) {
    const checks: any = document.getElementsByClassName(
      'custom-check-me-pending'
    );
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked ? true : false;
      }
    }
  }

  downloadSelectedforApproval() {
    let selected: string[] = [];
    const checks: any = document.getElementsByClassName(
      'custom-check-me-approval'
    );
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
          selected.push(this.forApproval[i].quotationId);
        }
      }
      if (selected.length > 0) {
        this.quote.generateMultipleQuote(selected).subscribe({
          next: (res) => {
            console.log(res);
            let md = this.mdCtrl.open(ExportComponent, { size: 'md' });
            md.componentInstance.data = [res.info];
          },
          error: ({ error }) => {
            console.log(error);
          },
        });
      }
    }
  }

  downloadSelectedPending() {
    let selected: string[] = [];
    const checks: any = document.getElementsByClassName(
      'custom-check-me-pending'
    );
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
          selected.push(this.pending[i].quotationId);
        }
      }
      if (selected.length > 0) {
        this.quote.generateMultipleQuote(selected).subscribe({
          next: (res) => {
            console.log(res);
            let md = this.mdCtrl.open(ExportComponent, { size: 'md' });
            md.componentInstance.data = [res.info];
          },
          error: ({ error }) => {
            console.log(error);
          },
        });
      }
    }
  }

  handleApprovalSearch() {
    const data =
      this.aSearch !== ''
        ? this.allApproval.filter((e: any) =>
            e.quotationId
              .toLocaleLowerCase()
              .startsWith(this.aSearch.toLocaleLowerCase())
          )
        : this.allApproval;
    this.forApproval = data;
  }

  handlePendingSearch() {
    const data =
      this.pSearch !== ''
        ? this.allPending.filter((e: any) =>
            e.quotationId
              .toLocaleLowerCase()
              .startsWith(this.pSearch.toLocaleLowerCase())
          )
        : this.allPending;
    this.pending = data;
  }
}
