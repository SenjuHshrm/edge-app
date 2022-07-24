import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoaRoutingModule } from './soa-routing.module';
import { SoaComponent } from './soa.component';


@NgModule({
  declarations: [
    SoaComponent
  ],
  imports: [
    CommonModule,
    SoaRoutingModule
  ]
})
export class SoaModule { }
