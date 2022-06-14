import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-customer',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.scss'],
})
export class MyCustomerComponent implements OnInit {
  tableDatas: any = [, , , ,];

  constructor() {}

  ngOnInit(): void {}
}
