import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateInquiryComponent } from 'src/app/components/modals/create-inquiry/create-inquiry.component';
import { ViewInquiryComponent } from 'src/app/components/modals/view-inquiry/view-inquiry.component';
import { InquiryService } from 'src/app/services/inquiry.service';
import { ExportComponent } from 'src/app/components/modals/export/export.component';
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit {
  public inquiryList: any = [];
  public allData: any = [];
  public search: string = '';

  constructor(private mdCtrl: NgbModal, private inq: InquiryService) {}

  ngOnInit(): void {
    this.inq.getInquiries().subscribe({
      next: (res) => {
        res.info.map((i: any) => {
          // i.createdAt = moment(i.createdAt).format('MM/DD/YYYY, hh:mm a')
          this.inquiryList.push(i);
          this.allData.push(i);
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
      fullscreen: 'lg',
    });
    viewInq.componentInstance.data = data;
    viewInq.result.then((result) => {}).catch(() => console.log());
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
          selected.push(this.inquiryList[i].inqId);
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

  handleSearch() {
    const data =
      this.search !== ''
        ? this.allData.filter((e: any) =>
            e.inqId
              .toLocaleLowerCase()
              .startsWith(this.search.toLocaleLowerCase())
          )
        : this.allData;
    this.inquiryList = data;
  }
}
