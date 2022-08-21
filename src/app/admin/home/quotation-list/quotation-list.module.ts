import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationListRoutingModule } from './quotation-list-routing.module';
import { QuotationListComponent } from './quotation-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuotationListComponent],
  imports: [
    CommonModule,
    QuotationListRoutingModule,
    ComponentsModule,
    PipesModule,
    FormsModule,
  ],
})
export class QuotationListModule {}
