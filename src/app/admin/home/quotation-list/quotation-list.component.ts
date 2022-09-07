import { ExportComponent } from './../../../components/modals/export/export.component';
import { QuotationService } from './../../../services/quotation.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQuotationComponent } from 'src/app/components/modals/view-quotation/view-quotation.component';
import { CreateQuotationComponent } from 'src/app/components/modals/create-quotation/create-quotation.component';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
})
export class QuotationListComponent implements OnInit {
  public quoteList: any = [];

  constructor(private mdCtrl: NgbModal, private quote: QuotationService) {}

  ngOnInit(): void {
    this.quote.getAllQuotations().subscribe({
      next: (res: any) => {
        this.quoteList = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  viewQuotation(i: any) {
    let viewQuot = this.mdCtrl.open(ViewQuotationComponent, {
      size: 'xl',
      fullscreen: 'lg',
    });
    viewQuot.componentInstance.data = i;
  }

  createQuotation() {
    let createQuot = this.mdCtrl.open(CreateQuotationComponent, {
      size: 'xl',
      backdrop: 'static',
    });
  }

  handleSelected(evt: any) {
    let checks: any = document.getElementsByClassName('custom-check-me')
    if(checks.length > 0) {
      for(let i = 0; i < checks.length; i++) {
        checks[i].checked = (evt.target.checked) ? true : false
      }
    }
  }

  dowloadSelected() {
    let selected: string[] = []
    const checks: any = document.getElementsByClassName('custom-check-me')
    if(checks.length > 0) {
      for(let i = 0; i < checks.length; i++) {
        if(checks[i].checked) {
          selected.push(this.quoteList[i].quotationId)
        }
      }
      if(selected.length > 0) {
        this.quote.generateMultipleQuote(selected).subscribe({
          next: (res) => {
            let md = this.mdCtrl.open(ExportComponent, { size: 'md' })
            md.componentInstance.data = [res.info]
          },
          error: ({ error }) => {
            console.log(error)
          }
        })
      }
    }
  }
}
