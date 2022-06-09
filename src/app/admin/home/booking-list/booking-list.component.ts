import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  public tableHeader = [
    { thead: 'ID Number'},
    { thead: 'Date'},
    { thead: 'Receiver Name'},
    { thead: 'Phone No.'},
    { thead: 'Address'},
    { thead: 'Zip Code'},
    { thead: 'Province/State'},
    { thead: 'City'},
    { thead: 'Barangay'},
    { thead: 'Products'},
    { thead: 'Quantity'},
    { thead: 'COD'},
    { thead: 'Sender/Page Name'},
    { thead: 'Contact No.'},
    { thead: 'Remarks'},
    { thead: 'Fullfillment'},
    { thead: 'Tracking Number'},
    { thead: 'Area'},

  ];

  
  public tableData = [

    { id: '1',date: 'June 09,2022',receivename: 'Juan Dela Cruz',phoneno: '0915648932',address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
    zipcode: '4000',province: 'Laguna, Philippines',city: 'San Pablo City',barangay: 'Bagong Bayan',
    products: 'Safeguard',
    quantity: '1',
    cod: 'Yes',
    senderpagename: 'Maria',
    contact: '09516432826',
    remarks: 'This remarks',
    fullfillment: 'OKs na oks', trackno: '4546548798312132', area: 'Location area'},

    { id: '1',date: 'June 09,2022',receivename: 'Juan Dela Cruz',phoneno: '0915648932',address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
    zipcode: '4000',province: 'Laguna, Philippines',city: 'San Pablo City',barangay: 'Bagong Bayan',
    products: 'Safeguard',
    quantity: '1',
    cod: 'Yes',
    senderpagename: 'Maria',
    contact: '09516432826',
    remarks: 'This remarks',
    fullfillment: 'OKs na oks', trackno: '4546548798312132', area: 'Location area'},

    { id: '1',date: 'June 09,2022',receivename: 'Juan Dela Cruz',phoneno: '0915648932',address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
    zipcode: '4000',province: 'Laguna, Philippines',city: 'San Pablo City',barangay: 'Bagong Bayan',
    products: 'Safeguard',
    quantity: '1',
    cod: 'Yes',
    senderpagename: 'Maria',
    contact: '09516432826',
    remarks: 'This remarks',
    fullfillment: 'OKs na oks', trackno: '4546548798312132', area: 'Location area'},

    { id: '1',date: 'June 09,2022',receivename: 'Juan Dela Cruz',phoneno: '0915648932',address: 'Brgy. Bagong Bayan, San Pablo City, Laguna',
    zipcode: '4000',province: 'Laguna, Philippines',city: 'San Pablo City',barangay: 'Bagong Bayan',
    products: 'Safeguard',
    quantity: '1',
    cod: 'Yes',
    senderpagename: 'Maria',
    contact: '09516432826',
    remarks: 'This remarks',
    fullfillment: 'OKs na oks', trackno: '4546548798312132', area: 'Location area'},
  ];


}
