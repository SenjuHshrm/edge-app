import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderComponent } from './purchase-order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PurchaseOrderComponent],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    ComponentsModule,
    PipesModule,
    FormsModule,
  ],
})
export class PurchaseOrderModule {}
