import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
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
    InquiryListRoutingModule,
    ComponentsModule,
    PipesModule
  ]
})
export class InquiryListModule { }
