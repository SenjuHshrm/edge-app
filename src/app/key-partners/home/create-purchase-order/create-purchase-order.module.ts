import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePurchaseOrderRoutingModule } from './create-purchase-order-routing.module';
import { CreatePurchaseOrderComponent } from './create-purchase-order.component';


@NgModule({
  declarations: [
    CreatePurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    CreatePurchaseOrderRoutingModule
  ]
})
export class CreatePurchaseOrderModule { }
