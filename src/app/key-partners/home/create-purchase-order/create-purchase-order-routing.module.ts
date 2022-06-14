import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePurchaseOrderComponent } from './create-purchase-order.component';

const routes: Routes = [{ path: '', component: CreatePurchaseOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePurchaseOrderRoutingModule { }
