import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import address from 'src/assets/address';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  public provinces: string[] = [];
  public cities: string[] = [];
  public brgys: string[] = [];

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

  constructor(
    private custServ: CustomerService,
    private mdCtrl: NgbActiveModal
  ) {}

  ngOnInit(): void {
    Object.keys(address).forEach((e) => {
      this.provinces.push(e);
    });
  }

  saveCustomer(evt: any) {
    evt.preventDefault();
    if (this.validateCustomer(evt.target)) {
      this.loading = true;
      let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
      this.customer.keyPartnerId = token.sub;
      this.custServ.create(this.customer).subscribe({
        next: (res: any) => {
          if (res.success) {
            Swal.fire({
              title: 'New Customer has been added.',
              icon: 'success',
            });
            this.loading = false;
            this.mdCtrl.close({ success: true });
          } else {
            Swal.fire({
              title: 'Failed to create a new Customer',
              icon: 'warning',
            });
            this.loading = false;
          }
        },
        error: ({ error }) => {
          Swal.fire({
            title: 'Failed to create a new Customer',
            icon: 'warning',
          });
          this.loading = false;
        },
      });
    }
  }

  validateCustomer(data: any): boolean {
    let message = '';
    if (this.customer.name === '') {
      message = 'Please enter fullname.';
    } else if (
      this.customer.addr.brgy === '' ||
      this.customer.addr.province === '' ||
      this.customer.addr.city === '' ||
      this.customer.addr.hsStNum === ''
    ) {
      message = 'Please complete the address details.';
    } else if (this.customer.contact === '') {
      message = 'Please enter contact.';
    } else if (this.customer.email === '') {
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
    Object.keys(address[str as keyof typeof address].municipality_list).forEach(
      (e) => {
        this.cities.push(e);
      }
    );
  }

  changeBrgys(str: string): void {
    this.brgys = [];
    let prov = this.customer.addr.province;
    let provs: any = address[prov as keyof typeof address].municipality_list;
    provs[str].barangay_list.map((brgy: any) => {
      this.brgys.push(brgy);
    });
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
        this.mdCtrl.close();
      }
    });
  };
}
