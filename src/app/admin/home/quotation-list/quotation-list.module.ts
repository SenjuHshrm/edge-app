import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationListRoutingModule } from './quotation-list-routing.module';
import { QuotationListComponent } from './quotation-list.component';


@NgModule({
  declarations: [
    QuotationListComponent
  ],
  imports: [
    CommonModule,
    QuotationListRoutingModule
  ]
})
export class QuotationListModule { }
