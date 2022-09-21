import { Component, Input, OnInit } from '@angular/core';
import { ClassificationService } from 'src/app/services/classification.service';
import { UserService } from 'src/app/services/user.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
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
    currentQty: '',
    in: '',
    out: '',
    rts: '',
    defective: '',
    price: '',
    sequence: '',
    codeName: '',
    codeId: '',
    criticalBalance: ''
  };

  public loading: boolean = false;

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

    this.itemData.keyPartnerId = this.data?.keyPartnerId._id;
    this.itemData.desc = this.data?.desc;
    this.itemData.code = this.data?.code.code;
    this.itemData.classification = this.data?.classification._id;
    this.itemData.color = this.data?.color._id;
    this.itemData.size = this.data?.size._id;

    this.itemData.in = this.data?.in;
    this.itemData.currentQty = this.data?.currentQty;
    this.itemData.out = this.data?.out;
    this.itemData.rts = this.data?.rts;
    this.itemData.defective = this.data?.defective;

    this.itemData.price = this.data?.price;
    this.itemData.sequence = this.data?.sequence;
    this.itemData.codeName = this.data?.code.code;
    this.itemData.codeId = this.data?.code._id;
    this.itemData.criticalBalance = this.data?.criticalBalance
  }

  saveData(evt: any) {
    evt.preventDefault();
    if (this.validateData(this.itemData)) {
      this.loading = true;
      this.invServ.update(this.itemData, this.data?._id).subscribe({
        next: (res: any) => {
          if (res.success) {
            Swal.fire({
              title: 'Item has been updated.',
              icon: 'success',
            });
            this.mdCtrl.close({ success: true, data: res.info });
            this.loading = false;
          } else {
            Swal.fire({
              title: 'Failed to update the item.',
              icon: 'warning',
            });
            this.loading = false;
          }
        },
        error: ({ error }) => {
          Swal.fire({
            title: 'Failed to update the item.',
            icon: 'warning',
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
      out,
      rts,
      defective,
      currentQty,
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
    } else if (data.in === '') {
      message = 'Please enter in value.';
    } else if (!/^[0-9]+$/i.test(data.in)) {
      message = 'Invalid in value.';
    } else if (out === '') {
      message = 'Please enter out size.';
    } else if (!/^[0-9]+$/i.test(out)) {
      message = 'Invalid out value.';
    } else if (rts === '') {
      message = 'Please enter rts size.';
    } else if (!/^[0-9]+$/i.test(rts)) {
      message = 'Invalid rts value.';
    } else if (defective === '') {
      message = 'Please enter defective.';
    } else if (!/^[0-9]+$/i.test(rts)) {
      message = 'Invalid defective value.';
    } else if (currentQty === '') {
      message = 'Please enter the current quantity';
    } else if (!/^[0-9]+$/i.test(currentQty)) {
      message = 'Invalid current quantity.';
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
