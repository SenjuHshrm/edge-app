import { KeyPartnerService } from 'src/app/services/key-partner.service';
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
  public keyList: any = [];

  public data = {
    keyPartner: '',
    keyPartnerId: '',
    desc: '',
    code: '',
    classification: '',
    color: '',
    size: '',
    quantity: '',
    price: '',
  };

  public loading: boolean = false;

  constructor(
    private classServ: ClassificationService,
    private invServ: InventoryService,
    private mdCtrl: NgbActiveModal,
    private kp: KeyPartnerService
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

    this.kp.getActivatedKeyPartners().subscribe({
      next: (res: any) => {
        this.keyPartners = res.info;
      },
    });
  }

  handleSearch(evt: any) {
    const search = evt.target.value;
    const data =
      search !== ''
        ? this.keyPartners.filter((e: any) =>
            e.email.toLowerCase().startsWith(search.toLowerCase())
          )
        : [];
    this.keyList = data;
    console.log(data, this.keyPartners, search);
  }

  keyListClick(id: string, name: string) {
    this.data.keyPartnerId = id;
    this.data.keyPartner = name;
    this.keyList = [];
  }

  saveData(evt: any) {
    evt.preventDefault();
    if (this.validateData(this.data)) {
      this.loading = true;
      this.invServ.create(this.data).subscribe({
        next: (res: any) => {
          if (res.success) {
            Swal.fire({
              title: 'Item has been added successfully.',
              icon: 'success',
            });
            this.mdCtrl.close({ success: true, data: res.info });
            this.loading = false;
          } else {
            Swal.fire({
              title: 'Failed to add a new item.',
              icon: 'success',
            });
            this.loading = false;
          }
        },
        error: ({ error }) => {
          Swal.fire({
            title: 'Failed to add a new item.',
            icon: 'success',
          });
          this.loading = false;
        },
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
    const isIdValid = this.keyPartners.filter(
      (e: any) => e._id === keyPartnerId
    );
    let message = '';

    if (keyPartnerId === '') {
      message = 'Please select a key partner.';
    } else if (isIdValid.length === 0) {
      message = 'Invalid KeyPartner.';
    } else if (desc === '') {
      message = 'Please enter the item name.';
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

  handleClose() {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.mdCtrl.close();
      }
    });
  }
}
