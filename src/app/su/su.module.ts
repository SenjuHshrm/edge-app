import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuRoutingModule } from './su-routing.module';
import { SuComponent } from './su.component';


@NgModule({
  declarations: [
    SuComponent
  ],
  imports: [
    CommonModule,
    SuRoutingModule
  ]
})
export class SuModule { }
