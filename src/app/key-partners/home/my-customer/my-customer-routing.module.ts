import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCustomerComponent } from './my-customer.component';

const routes: Routes = [{ path: '', component: MyCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCustomerRoutingModule { }
