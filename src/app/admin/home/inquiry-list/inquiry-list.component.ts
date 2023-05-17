import { QuotationService } from './../../../services/quotation.service';
import { ExportComponent } from './../../../components/modals/export/export.component';
import { InquiryService } from './../../../services/inquiry.service';
import { ViewInquiryComponent } from './../../../components/modals/view-inquiry/view-inquiry.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateQuotationComponent } from 'src/app/components/modals/create-quotation/create-quotation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
})
export class InquiryListComponent implements OnInit, OnDestroy {
  public inqList: any = [];
  public allList: any = [];
  public lSearch: string = '';
  public forRequote: any = [];

  private subs: Subscription = new Subscription()

  constructor(
    private mdCtrl: NgbModal,
    private inq: InquiryService,
    private quote: QuotationService
  ) {}

  ngOnInit(): void {
    let getAllInquiries = this.inq.getAllInquiries().subscribe({
      next: (res: any) => {
        this.inqList = res.info;
        this.allList = res.info;
      },
    });
    let getForRequote = this.quote.getForRequote().subscribe({
      next: (res: any) => {
        this.forRequote = res.info;
      },
    });
    this.subs.add(getAllInquiries)
    this.subs.add(getForRequote)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
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
        let generateInquiryFromSelected = this.inq.generateInquiryFromSelected(selected).subscribe({
          next: (res) => {
            console.log(res);
            let md = this.mdCtrl.open(ExportComponent, { size: 'md' });
            md.componentInstance.data = [res.info];
          },
          error: ({ error }) => {
            console.log(error);
          },
        });
        this.subs.add(generateInquiryFromSelected)
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
