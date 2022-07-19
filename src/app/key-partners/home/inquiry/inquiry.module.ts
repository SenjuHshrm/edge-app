import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryComponent } from './inquiry.component';


@NgModule({
  declarations: [
    InquiryComponent
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule
  ]
})
export class InquiryModule { }
