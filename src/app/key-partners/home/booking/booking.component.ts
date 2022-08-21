import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateBookingComponent } from 'src/app/components/modals/create-booking/create-booking.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public tableHeader = [];

  public tableData: any = [];

  constructor(
    private mdCtrl: NgbModal,
    private booking: BookingService
  ) {}

  ngOnInit(): void {

  }

  createNewBooking() {
    let createBooking = this.mdCtrl.open(CreateBookingComponent, {
      size: 'xl',
    });
  }
}
