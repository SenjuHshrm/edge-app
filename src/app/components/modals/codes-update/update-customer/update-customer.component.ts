import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import address from 'src/assets/address';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit, OnDestroy {
  @Input() data: any;

  public provinces: string[] = [];
  public cities: string[] = [];
  public brgys: string[] = [];

  public address: any = {};

  public customer = {
    name: '',
    addr: {
      province: '',
      city: '',
      brgy: '',
      hsStNum: '',
    },
    contact: '',
    email: '',
    keyPartnerId: '',
  };

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(
    private custServ: CustomerService,
    private mdCtrl: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.address = address;
    Object.keys(this.address).forEach((e) => {
      this.provinces.push(e);
    });
    this.changeCities(this.data?.addr?.province);
    this.changeBrgys(this.data?.addr?.city);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  saveCustomer(evt: any) {
    evt.preventDefault();
    if (this.validateCustomer(evt.target)) {
      this.loading = true;
      let update = this.custServ.update(this.data, this.data?._id).subscribe({
        next: (res: any) => {
          if (res.success) {
            Swal.fire({
              title: 'Customer has been updated.',
              icon: 'success',
            });
            this.mdCtrl.close({ success: true });
            this.loading = false;
          } else {
            Swal.fire({
              title: 'Failed to update the Customer',
              icon: 'warning',
            });
            this.loading = false;
          }
        },
        error: ({ error }) => {
          Swal.fire({
            title: 'Failed to update the Customer',
            icon: 'warning',
          });
          this.loading = false;
        },
      });
      this.subs.add(update)
    }
  }

  validateCustomer(data: any): boolean {
    let message = '';
    if (this.data?.name === '') {
      message = 'Please enter fullname.';
    } else if (
      this.data?.addr.brgy === '' ||
      this.data?.addr.province === '' ||
      this.data?.addr.city === '' ||
      this.data?.addr.hsStNum === ''
    ) {
      message = 'Please complete the address details.';
    } else if (this.data?.contact === '') {
      message = 'Please enter contact.';
    } else if (this.data?.email === '') {
      message = 'Please enter email.';
    }

    if (message !== '') {
      Swal.fire({
        title: message,
        icon: 'warning',
      });
      return false;
    } else {
      return true;
    }
  }

  changeCities(str: string): void {
    this.cities = [];
    this.brgys = [];
    Object.keys(this.address[str as keyof typeof this.address]?.municipality_list).forEach(
      (e) => {
        this.cities.push(e);
      }
    );
  }

  changeBrgys(str: string): void {
    this.brgys = [];
    let prov = this.data?.addr.province;
    let provs: any = this.address[prov as keyof typeof this.address]?.municipality_list;
    provs[str].barangay_list.map((brgy: any) => {
      this.brgys.push(brgy);
    });
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
