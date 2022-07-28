import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MySoaRoutingModule } from './my-soa-routing.module';
import { MySoaComponent } from './my-soa.component';


@NgModule({
  declarations: [
    MySoaComponent
  ],
  imports: [
    CommonModule,
    MySoaRoutingModule
  ]
})
export class MySoaModule { }
