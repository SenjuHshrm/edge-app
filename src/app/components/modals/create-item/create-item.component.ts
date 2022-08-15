import { Component, OnInit } from '@angular/core';
import { ClassificationService } from 'src/app/services/classification.service';
import { UserService } from 'src/app/services/user.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  public active: string = 'individual';
  public classification: any = [];
  public color: any = [];
  public size: any = [];
  public keyPartners: any = [];

  public data = {
    keyPartnerId: '',
    desc: '',
    code: '',
    classification: '',
    color: '',
    size: '',
    quantity: '',
    price: '',
  };

  constructor(
    private classServ: ClassificationService,
    private userServ: UserService,
    private invServ: InventoryService,
    private mdCtrl: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.classServ.getAll().subscribe((res) => {
      if (res.success) {
        this.classification = res.info.filter(
          (e: any) => e.type === 'classification'
        );
        this.size = res.info.filter((e: any) => e.type === 'size');
        this.color = res.info.filter((e: any) => e.type === 'color');
      }
    });

    this.userServ.getKeyPartners().subscribe((res) => {
      if (res.success) {
        this.keyPartners = res.info;
      }
    });
  }

  saveData(evt: any) {
    evt.preventDefault();
    if (this.validateData(this.data)) {
      this.invServ.create(this.data).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Item has been added successfully.',
            icon: 'success',
          });
          this.mdCtrl.close({ success: true, data: res.info });
        }
      });
    }
  }

  validateData(data: any): boolean {
    const {
      keyPartnerId,
      desc,
      code,
      classification,
      color,
      size,
      quantity,
      price,
    } = data;

    let message = '';

    if (keyPartnerId === '') {
      message = 'Please select a key partner.';
    } else if (desc === '') {
      message = 'Please enter the item name,';
    } else if (code === '') {
      message = 'Please enter the type code.';
    } else if (classification === '') {
      message = 'Please select a classification.';
    } else if (color === '') {
      message = 'Please select a color.';
    } else if (size === '') {
      message = 'Please select a size.';
    } else if (quantity === '') {
      message = 'Please enter the quantity';
    } else if (!/^[0-9]+$/i.test(quantity)) {
      message = 'Invalid quantity.';
    } else if (price === '') {
      message = 'Please enter the price.';
    } else if (!/^[0-9]*\.?[0-9]*$/i.test(price)) {
      message = 'Invalid price.';
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
}
