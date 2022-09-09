import { QuotationService } from './../../../services/quotation.service';
import { ExportComponent } from './../../../components/modals/export/export.component';
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
  public allList: any = [];
  public lSearch: string = '';
  public forRequote: any = [];

  constructor(
    private mdCtrl: NgbModal,
    private inq: InquiryService,
    private quote: QuotationService
  ) {}

  ngOnInit(): void {
    this.inq.getAllInquiries().subscribe({
      next: (res: any) => {
        this.inqList = res.info;
        this.allList = res.info;
      },
    });
    this.quote.getForRequote().subscribe({
      next: (res: any) => {
        this.forRequote = res.info;
      },
    });
  }

  viewInquiry(inq: any) {
    let viewInq: NgbModalRef = this.mdCtrl.open(ViewInquiryComponent, {
      size: 'xl',
      fullscreen: 'lg',
    });
    viewInq.componentInstance.data = inq;
  }

  createQuotation(inq: any) {
    let createQuote: NgbModalRef = this.mdCtrl.open(CreateQuotationComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    createQuote.componentInstance.data = inq;
  }

  handleSelectAll(evt: any) {
    const checks: any = document.getElementsByClassName('custom-check-me');
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked ? true : false;
      }
    }
  }

  downloadSelected() {
    let selected: string[] = [];
    const checks: any = document.getElementsByClassName('custom-check-me');
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
          selected.push(this.inqList[i].inqId);
        }
      }
      if (selected.length > 0) {
        this.inq.generateInquiryFromSelected(selected).subscribe({
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

  setTableColor(status: string): string {
    let res: string = '';
    switch (status) {
      case 'pending':
        res = 'table-info';
        break;
      case 'requote':
        res = 'table-warning';
        break;
      default:
        res = 'table-success';
    }
    return res;
  }

  handleListSearch() {
    const data =
      this.lSearch !== ''
        ? this.allList.filter((e: any) =>
            e.inqId
              .toLocaleLowerCase()
              .startsWith(this.lSearch.toLocaleLowerCase())
          )
        : this.allList;
    this.inqList = data;
  }
}
