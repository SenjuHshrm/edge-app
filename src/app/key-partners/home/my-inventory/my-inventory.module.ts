import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInventoryRoutingModule } from './my-inventory-routing.module';
import { MyInventoryComponent } from './my-inventory.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyInventoryComponent],
  imports: [CommonModule, MyInventoryRoutingModule, FormsModule],
})
export class MyInventoryModule {}
