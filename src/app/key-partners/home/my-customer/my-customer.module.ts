import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCustomerRoutingModule } from './my-customer-routing.module';
import { MyCustomerComponent } from './my-customer.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyCustomerComponent],
  imports: [
    CommonModule,
    MyCustomerRoutingModule,
    ComponentsModule,
    FormsModule,
  ],
})
export class MyCustomerModule {}
