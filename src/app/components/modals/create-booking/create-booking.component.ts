import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  public active = 'individual';

  constructor() {}

  ngOnInit(): void {}

  handleActive(str: string) {
    this.active = str;
  }

  handleTextLimit(str: string) {
    if (str.length <= 20) {
      return str;
    } else {
      return `${str.substring(0, 20)}...`;
    }
  }
}
