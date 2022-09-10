import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyQuotationRoutingModule } from './my-quotation-routing.module';
import { MyQuotationComponent } from './my-quotation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyQuotationComponent],
  imports: [CommonModule, MyQuotationRoutingModule, FormsModule],
})
export class MyQuotationModule {}
