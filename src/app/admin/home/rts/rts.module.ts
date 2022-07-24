import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtsRoutingModule } from './rts-routing.module';
import { RtsComponent } from './rts.component';


@NgModule({
  declarations: [
    RtsComponent
  ],
  imports: [
    CommonModule,
    RtsRoutingModule
  ]
})
export class RtsModule { }
