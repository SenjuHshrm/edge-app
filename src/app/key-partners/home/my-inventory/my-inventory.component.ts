import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBundleComponent } from 'src/app/components/modals/create-bundle/create-bundle.component';

@Component({
  selector: 'app-my-inventory',
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.scss'],
})
export class MyInventoryComponent implements OnInit {
  public tableData = [{}, {}, {}, {}, {}];

  constructor(private mdCtrl: NgbModal) {}

  ngOnInit(): void {}

  createBundleItem() {
    let createCustomer = this.mdCtrl.open(CreateBundleComponent, {
      size: 'lg',
    });
  }
}
