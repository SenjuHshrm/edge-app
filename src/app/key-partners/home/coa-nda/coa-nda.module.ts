import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoaNdaRoutingModule } from './coa-nda-routing.module';
import { CoaNdaComponent } from './coa-nda.component';


@NgModule({
  declarations: [
    CoaNdaComponent
  ],
  imports: [
    CommonModule,
    CoaNdaRoutingModule
  ]
})
export class CoaNdaModule { }