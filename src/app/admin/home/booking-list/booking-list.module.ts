import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingListRoutingModule } from './booking-list-routing.module';
import { BookingListComponent } from './booking-list.component';


@NgModule({
  declarations: [
    BookingListComponent
  ],
  imports: [
    CommonModule,
    BookingListRoutingModule
  ]
})
export class BookingListModule { }
