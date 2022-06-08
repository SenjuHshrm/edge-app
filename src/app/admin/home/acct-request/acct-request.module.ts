import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcctRequestRoutingModule } from './acct-request-routing.module';
import { AcctRequestComponent } from './acct-request.component';


@NgModule({
  declarations: [
    AcctRequestComponent
  ],
  imports: [
    CommonModule,
    AcctRequestRoutingModule
  ]
})
export class AcctRequestModule { }
