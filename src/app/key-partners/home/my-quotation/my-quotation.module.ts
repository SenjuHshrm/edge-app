import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyQuotationRoutingModule } from './my-quotation-routing.module';
import { MyQuotationComponent } from './my-quotation.component';


@NgModule({
  declarations: [
    MyQuotationComponent
  ],
  imports: [
    CommonModule,
    MyQuotationRoutingModule
  ]
})
export class MyQuotationModule { }
