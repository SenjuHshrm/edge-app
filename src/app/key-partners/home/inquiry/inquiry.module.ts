import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryComponent } from './inquiry.component';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    InquiryComponent
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    ComponentsModule,
    PipesModule
  ]
})
export class InquiryModule { }
