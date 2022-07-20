import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateBookingComponent } from 'src/app/components/modals/create-booking/create-booking.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public tableHeader = [
    { thead: 'Receiver Name' },
    { thead: 'Phone Number.' },
    { thead: 'Address' },
    { thead: 'Zip Code' },
    { thead: 'Province/State' },
    { thead: 'City' },
    { thead: 'Barangay' },
    { thead: 'Products' },
    { thead: 'Quantity' },
    { thead: 'COD' },
    { thead: 'Sender/Page Name' },
    { thead: 'Contact No.' },
    { thead: 'Remarks' },
  ];

  public tableData = [
    {
      receivename: 'Juan Dela Cruz',
      phoneno: '0915648932',
      address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
      zipcode: '4000',
      province: 'Laguna, Philippines',
      city: 'San Pablo City',
      barangay: 'Bagong Bayan',
      products: 'Safeguard',
      quantity: '1',
      cod: 'Yes',
      senderpagename: 'Maria',
      contact: '09516432826',
      remarks: 'This remarks',
    },

    {
      receivename: 'Juan Dela Cruz',
      phoneno: '0915648932',
      address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
      zipcode: '4000',
      province: 'Laguna, Philippines',
      city: 'San Pablo City',
      barangay: 'Bagong Bayan',
      products: 'Safeguard',
      quantity: '1',
      cod: 'Yes',
      senderpagename: 'Maria',
      contact: '09516432826',
      remarks: 'This remarks',
    },

    {
      receivename: 'Juan Dela Cruz',
      phoneno: '0915648932',
      address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
      zipcode: '4000',
      province: 'Laguna, Philippines',
      city: 'San Pablo City',
      barangay: 'Bagong Bayan',
      products: 'Safeguard',
      quantity: '1',
      cod: 'Yes',
      senderpagename: 'Maria',
      contact: '09516432826',
      remarks: 'This remarks',
    },

    {
      receivename: 'Juan Dela Cruz',
      phoneno: '0915648932',
      address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
      zipcode: '4000',
      province: 'Laguna, Philippines',
      city: 'San Pablo City',
      barangay: 'Bagong Bayan',
      products: 'Safeguard',
      quantity: '1',
      cod: 'Yes',
      senderpagename: 'Maria',
      contact: '09516432826',
      remarks: 'This remarks',
    },
  ];

  constructor(
    private mdCtrl: NgbModal
  ) {}

  ngOnInit(): void {}

  createNewBooking() {
    let createBooking = this.mdCtrl.open(CreateBookingComponent)
  }
}
