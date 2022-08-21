import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryListRoutingModule } from './inquiry-list-routing.module';
import { InquiryListComponent } from './inquiry-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InquiryListComponent],
  imports: [
    CommonModule,
    InquiryListRoutingModule,
    ComponentsModule,
    PipesModule,
    FormsModule,
  ],
})
export class InquiryListModule {}
