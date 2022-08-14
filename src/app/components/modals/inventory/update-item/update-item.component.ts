import { Component, Input, OnInit } from '@angular/core';
import { ClassificationService } from 'src/app/services/classification.service';
import { UserService } from 'src/app/services/user.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent implements OnInit {
  @Input() public data: any;

  public classification: any = [];
  public color: any = [];
  public size: any = [];
  public keyPartners: any = [];

  public itemData = {
    keyPartnerId: '',
    desc: '',
    code: '',
    classification: '',
    color: '',
    size: '',
    quantity: '',
    price: '',
    sequence: '',
    codeName: '',
    codeId: '',
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

    this.itemData.keyPartnerId = this.data.keyPartnerId._id;
    this.itemData.desc = this.data.desc;
    this.itemData.code = this.data.code.code;
    this.itemData.classification = this.data.classification._id;
    this.itemData.color = this.data.color._id;
    this.itemData.size = this.data.size._id;
    this.itemData.quantity = this.data.movingInv.quantity;
    this.itemData.price = this.data.movingInv.price;
    this.itemData.sequence = this.data.sequence;
    this.itemData.codeName = this.data.code.code;
    this.itemData.codeId = this.data.code._id;
  }

  saveData(evt: any) {
    evt.preventDefault();
    if (this.validateData(this.itemData)) {
      this.invServ.update(this.itemData, this.data._id).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Item has been updated.',
            icon: 'success',
          });
          this.mdCtrl.close({ success: true });
        } else {
          Swal.fire({
            title: 'Failed to update the item.',
            icon: 'warning',
          });
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
    } else if (!/^[0-9]+$/i.test(price)) {
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
