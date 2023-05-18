import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingListRoutingModule } from './booking-list-routing.module';
import { BookingListComponent } from './booking-list.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BookingListComponent],
  imports: [CommonModule, BookingListRoutingModule, FormsModule, ComponentsModule, NgbPaginationModule],
})
export class BookingListModule {}
