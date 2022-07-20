import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateCustomerComponent } from 'src/app/components/modals/create-customer/create-customer.component';

@Component({
  selector: 'app-my-customer',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.scss'],
})
export class MyCustomerComponent implements OnInit {
  tableDatas: any = [, , , ,];

  constructor(
    private mdCtrl: NgbModal
  ) {}

  ngOnInit(): void {}

  createNewCustomer() {
    let createCustomer = this.mdCtrl.open(CreateCustomerComponent)
  }
}
