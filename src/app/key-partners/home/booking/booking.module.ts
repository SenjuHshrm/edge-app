import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingComponent],
  imports: [CommonModule, BookingRoutingModule, ComponentsModule, FormsModule, NgbPaginationModule],
})
export class BookingModule {}
