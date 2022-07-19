import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryListRoutingModule } from './inquiry-list-routing.module';
import { InquiryListComponent } from './inquiry-list.component';


@NgModule({
  declarations: [
    InquiryListComponent
  ],
  imports: [
    CommonModule,
    InquiryListRoutingModule
  ]
})
export class InquiryListModule { }
