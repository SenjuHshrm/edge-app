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
  public allData: any = [];
  public search: string = '';

  constructor(private mdCtrl: NgbModal, private quote: QuotationService) {}

  ngOnInit(): void {
    this.quote.getAllQuotations().subscribe({
      next: (res: any) => {
        this.quoteList = res.info;
        this.allData = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  viewQuotation(i: any) {
    let viewQuot = this.mdCtrl.open(ViewQuotationComponent, { size: 'xl' });
    viewQuot.componentInstance.data = i;
  }

  createQuotation() {
    let createQuot = this.mdCtrl.open(CreateQuotationComponent, {
      size: 'xl',
    });
  }

  handleSearch() {
    const data =
      this.search !== ''
        ? this.allData.filter((e: any) =>
            e.quotationId
              .toLocaleLowerCase()
              .startsWith(this.search.toLocaleLowerCase())
          )
        : this.allData;
    this.quoteList = data;
  }
}
