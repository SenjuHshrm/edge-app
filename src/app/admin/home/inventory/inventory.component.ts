import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateItemComponent } from 'src/app/components/modals/create-item/create-item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  public tableData = [{}, {}, {}, {}, {}];
  constructor(private mdCtrl: NgbModal) {}

  ngOnInit(): void {}

  createNewItem() {
    let createBooking = this.mdCtrl.open(CreateItemComponent, {
      size: 'lg',
    });
  }
}
