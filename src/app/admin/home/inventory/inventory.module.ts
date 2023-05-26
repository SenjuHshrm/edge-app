import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, InventoryRoutingModule, FormsModule, NgbPaginationModule],
})
export class InventoryModule {}
