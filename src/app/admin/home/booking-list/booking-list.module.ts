import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingListRoutingModule } from './booking-list-routing.module';
import { BookingListComponent } from './booking-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingListComponent],
  imports: [CommonModule, BookingListRoutingModule, FormsModule],
})
export class BookingListModule {}
