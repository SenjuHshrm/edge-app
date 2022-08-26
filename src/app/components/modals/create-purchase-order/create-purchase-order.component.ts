import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderService } from './../../../services/purchase-order.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss'],
})
export class CreatePurchaseOrderComponent implements OnInit {
  @Input() public data: any;
  public pos: any = [];
  public itemPlaceholder: any = [];
  public items: any = [];
  public poData: any = {
    itemId: '',
    description: '',
    units: '',
    unitPrice: '',
    quantity: '',
    totalPrice: '',
  };

  constructor(private po: PurchaseOrderService, private md: NgbActiveModal) {}

  ngOnInit(): void {
    this.data.items.forEach((x: any) => {
      this.items.push(x);
    });
  }

  displayInfo(id: string) {
    let item = this.items.filter((i: any) => {
      return i._id === id;
    });
    this.poData = {
      itemId: item[0]._id,
      description: item[0].description,
      units: '',
      unitPrice: item[0].unitPrice,
      quantity: item[0].quantity,
      totalPrice: +item[0].quantity * +item[0].unitPrice,
    };
  }

  computeTotalPrice() {
    this.poData.totalPrice = this.poData.quantity * +this.poData.unitPrice;
  }

  handleSavePO() {
    if (this.pos.length !== 0) {
      let req = {
        keyPartnerId: this.data.keyPartnerId._id,
        poFrom: this.data.quotationId,
        items: this.pos,
      };
      this.po.createPurchaseOrder(req).subscribe({
        next: (res: any) => {
          this.md.close(res.info);
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });
    } else {
      Swal.fire({
        title: 'Please select an item.',
        icon: 'info',
      });
    }
  }

  addPO(item: any) {
    if (item.itemId !== '') {
      if (this.validateItem(item)) {
        this.pos.push(item);
        let i = this.items.findIndex((x: any) => x._id, item.itemId);
        this.itemPlaceholder.push(this.items[i]);
        this.items.splice(i, 1);
        this.poData = {
          itemId: '',
          description: '',
          units: '',
          unitPrice: '',
          quantity: '',
          totalPrice: '',
        };
      }
    } else {
      Swal.fire({
        title: 'Please select an item.',
        icon: 'info',
      });
    }
  }

  validateItem(data: any): boolean {
    const { description, quantity, units, unitPrice } = data;
    let message = '';

    if (description === '') {
      message = 'Please enter item description.';
    } else if (quantity === '') {
      message = 'Please enter the quantity.';
    } else if (units === '') {
      message = 'Please enter units.';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(quantity)) {
      message = 'Invalid quantity value.';
    } else if (unitPrice === '') {
      message = 'Please enter the price / unit.';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(unitPrice)) {
      message = 'Invalid price/unit value.';
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

  removeFromList(i: number) {
    let ind = this.itemPlaceholder.findIndex(
      (x: any) => x._id === this.pos[i].itemId
    );
    this.items.push(this.itemPlaceholder[ind]);
    this.pos.splice(i, 1);
  }

  handleClose = () => {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.md.close();
      }
    });
  };
}
