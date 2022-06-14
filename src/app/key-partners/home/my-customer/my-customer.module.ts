import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCustomerRoutingModule } from './my-customer-routing.module';
import { MyCustomerComponent } from './my-customer.component';


@NgModule({
  declarations: [
    MyCustomerComponent
  ],
  imports: [
    CommonModule,
    MyCustomerRoutingModule
  ]
})
export class MyCustomerModule { }
