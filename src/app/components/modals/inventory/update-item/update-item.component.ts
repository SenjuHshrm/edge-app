import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClassificationService } from 'src/app/services/classification.service';
import { UserService } from 'src/app/services/user.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent implements OnInit, OnDestroy {
  @Input() public data: any;

  public classification: any = [];
  public color: any = [];
  public size: any = [];
  public keyPartners: any = [];

  public itemData: any = {
    keyPartnerId: '',
    desc: '',
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
    criticalBalance: '',
    kpOwned: false,
  };

  public currentQty: number = 0;

  public currentIn: number = 0
  public currentOut: number = 0
  public currentRTS: number = 0
  public currentDef: number = 0

  public addValIn: number = 0
  public addValOut: number = 0
  public addValRTS: number = 0
  public addValDef: number = 0

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(
    private classServ: ClassificationService,
    private userServ: UserService,
    private invServ: InventoryService,
    private mdCtrl: NgbActiveModal
  ) {}

  ngOnInit(): void {
    let getAll = this.classServ.getAll().subscribe((res) => {
      if (res.success) {
        this.classification = res.info.filter(
          (e: any) => e.type === 'classification'
        );
        this.size = res.info.filter((e: any) => e.type === 'size');
        this.color = res.info.filter((e: any) => e.type === 'color');
      }
    });

    let getKeyPartners = this.userServ.getKeyPartners().subscribe((res) => {
      if (res.success) {
        this.keyPartners = res.info;
      }
    });

    this.subs.add(getAll)
    this.subs.add(getKeyPartners)

    this.itemData.keyPartnerId = this.data?.keyPartnerId._id;
    this.itemData.desc = this.data?.desc;
    this.itemData.classification = this.data?.classification._id;
    this.itemData.color = this.data?.color._id;
    this.itemData.size = this.data?.size._id;

    this.itemData.in = '0';
    this.itemData.currentQty = this.data?.currentQty;
    this.itemData.out = this.data?.out;
    this.itemData.rts = this.data?.rts;
    this.itemData.defective = this.data?.defective;

    this.itemData.price = this.data?.price;
    this.itemData.sequence = this.data?.sequence;
    this.itemData.criticalBalance = this.data?.criticalBalance;
    this.itemData.kpOwned = this.data?.kpOwned;

    this.currentQty = +this.itemData.currentQty
    this.currentIn = +this.itemData.in
    this.currentOut = +this.itemData.out
    this.currentRTS = +this.itemData.rts
    this.currentDef = +this.itemData.defective
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  saveData(evt: any) {
    evt.preventDefault();
    if (this.validateData(this.itemData)) {
      this.loading = true;
      let update = this.invServ.update(this.itemData, this.data?._id).subscribe({
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
      this.subs.add(update)
    }
  }

  validateData(data: any): boolean {
    const {
      keyPartnerId,
      desc,
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

  nemen(e: any) {
    this.itemData.kpOwned = e.target.checked;
  }

  updateQuantity(field: string, current: number, update: number): void {
    this.itemData[field] = (current  + update).toString()
    this.itemData.currentQty = this.currentQty + ((this.addValIn + this.addValRTS) - (this.addValOut + this.addValDef))
  }

  resetTable() {
    this.itemData.in = this.currentIn.toString()
    this.itemData.out = this.currentOut.toString()
    this.itemData.rts = this.currentRTS.toString()
    this.itemData.defective = this.currentDef.toString()
    this.itemData.currentQty = this.currentQty.toString()

    this.addValIn = 0
    this.addValOut = 0
    this.addValRTS = 0
    this.addValDef = 0
  }
}
