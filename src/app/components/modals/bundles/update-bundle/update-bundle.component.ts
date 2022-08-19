import { Component, Input, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { InventoryService } from 'src/app/services/inventory.service';
import { BundleService } from 'src/app/services/bundle.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-bundle',
  templateUrl: './update-bundle.component.html',
  styleUrls: ['./update-bundle.component.scss'],
})
export class UpdateBundleComponent implements OnInit {
  @Input() public current: any;

  public items: any = [];

  public data: any = {
    name: '',
    items: [],
    keyPartnerId: '',
  };

  public item = {
    id: '',
    quantity: '',
  };

  constructor(
    private invServ: InventoryService,
    private bundleServ: BundleService,
    private mdCtrl: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getAllItems();
    this.bundleServ.getBundle(this.current._id).subscribe((res) => {
      if (res.success) {
        this.data = res.info;
      }
    });
  }

  getAllItems() {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.invServ.getAllByKeyPartners(token.sub).subscribe((res) => {
      if (res.success) {
        this.items = res.info;
      }
    });
  }

  handleAddedItem() {
    if (this.validateItem(this.item)) {
      if (this.data.items.length < 7) {
        let ind = this.items.findIndex((e: any) => e._id === this.item.id);
        const itemData = {
          itemId: this.item.id,
          item: this.items[ind].desc,
          quantity: this.item.quantity,
          price: this.items[ind].price,
        };
        this.data.items = [itemData, ...this.data.items];
        this.item.id = '';
        this.item.quantity = '';
      } else {
        Swal.fire({
          title: 'Maximum of 7 items per bundle.',
          icon: 'info',
        });
      }
    }
  }

  validateItem(data: any): boolean {
    let message = '';
    let ind = this.items.findIndex((e: any) => e._id === data.id);
    const isAdded = this.data.items.find((e: any) => e.itemId === data.id);

    if (isAdded) {
      message = 'This item is already added in the current bundle.';
    } else if (data.id === '') {
      message = 'Please select an item.';
    } else if (data.quantity === '') {
      message = 'Please enter the quantity.';
    } else if (!/^[0-9]+$/i.test(data.quantity)) {
      message = 'Invalid quantity.';
    } else if (
      parseFloat(data.quantity) > parseFloat(this.items[ind].currentQty)
    ) {
      message = 'Insufficient Quantity for this item.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire({
        title: message,
        icon: 'info',
      });
      return false;
    }
  }

  validateData(data: any): boolean {
    let message = '';
    if (data.name === '') {
      message = 'Please enter the bundle name.';
    } else if (data.items.length === 0) {
      message = 'Please select an item to bundle.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire({
        title: message,
        icon: 'info',
      });
      return false;
    }
  }

  removeItem(ind: any) {
    this.data.items.splice(ind, 1);
  }

  saveData() {
    if (this.data.items.length < 2) {
      Swal.fire({
        title: 'Minimum of 2 items per bundle.',
        icon: 'info',
      });
    } else {
      if (this.validateData(this.data)) {
        this.bundleServ.update(this.data, this.current._id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Bundle has been updated.',
              icon: 'success',
            });
            this.mdCtrl.close({ success: true, data: res.info });
          } else {
            Swal.fire({
              title: 'Failed to update the bundle.',
              icon: 'warning',
            });
          }
        });
      }
    }
  }
}