import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyPartnersRoutingModule } from './key-partners-routing.module';
import { KeyPartnersComponent } from './key-partners.component';


@NgModule({
  declarations: [
    KeyPartnersComponent
  ],
  imports: [
    CommonModule,
    KeyPartnersRoutingModule
  ]
})
export class KeyPartnersModule { }
