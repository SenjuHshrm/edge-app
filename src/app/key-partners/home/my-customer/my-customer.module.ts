import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCustomerRoutingModule } from './my-customer-routing.module';
import { MyCustomerComponent } from './my-customer.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MyCustomerComponent],
  imports: [CommonModule, MyCustomerRoutingModule, ComponentsModule],
})
export class MyCustomerModule {}
