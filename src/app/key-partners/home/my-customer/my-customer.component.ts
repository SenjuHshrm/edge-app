import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateCustomerComponent } from 'src/app/components/modals/create-customer/create-customer.component';
import { CustomerService } from 'src/app/services/customer.service';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { UpdateCustomerComponent } from 'src/app/components/modals/codes-update/update-customer/update-customer.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-customer',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.scss'],
})
export class MyCustomerComponent implements OnInit, OnDestroy {
  public customers: any = [];
  public allData: any = [];
  public page: any = 1;
  public size: any = 10;
  public totalpage: any = 0;
  public category: string = 'email';
  public search: string = '';

  private subs: Subscription = new Subscription()

  constructor(private mdCtrl: NgbModal, private custServ: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  handlePagination(data: any, page: any, size: any): any {
    return data.slice((page - 1) * size, size + (page - 1) * size);
  }

  handlePage(str: string) {
    if (str === 'next') {
      if (this.page < this.totalpage) {
        this.page += 1;
      }
    } else {
      if (this.page > 1) {
        this.page -= 1;
      }
    }
  }

  handleSearch() {
    const data =
      this.search !== ''
        ? this.allData.filter((e: any) =>
            e[this.category].toLowerCase().startsWith(this.search.toLowerCase())
          )
        : this.allData;
    this.customers = data;
    let totalPages = Math.floor(data.length / this.size);
    if (data.length % this.size > 0) totalPages += 1;
    this.page = 1;
    this.totalpage = totalPages;
  }

  getCustomers() {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    let getAllByKeyPartner = this.custServ.getAllByKeyPartner(token.sub).subscribe((res) => {
      if (res.success) {
        let totalPages = Math.floor(res.info.length / this.size);
        if (res.info.length % this.size > 0) totalPages += 1;
        this.totalpage = totalPages;
        this.customers = res.info;
        this.allData = res.info;
      }
    });
    this.subs.add(getAllByKeyPartner)
  }

  fullAddress(addr: any) {
    return `${addr?.hsStNum} ${addr?.brgy}, ${addr?.city} ${addr?.province}`.toLowerCase();
  }

  createNewCustomer() {
    let createCustomer = this.mdCtrl.open(CreateCustomerComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    createCustomer.result.then((res) => {
      if (res.success) {
        this.getCustomers();
      }
    });
  }

  deleteCustomer(id: any) {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((response) => {
      if (response.isConfirmed) {
        let del = this.custServ.delete(id).subscribe((res) => {
          if (res.success) {
            this.getCustomers();
          } else {
            Swal.fire({
              title: 'Failed to delete the customer record.',
              icon: 'error',
            });
          }
        });
        this.subs.add(del)
      } else {
        Swal.fire({
          title: 'Deletion cancelled.',
          icon: 'info',
        });
      }
    });
  }

  updateCustomer(data: any) {
    let updateCustomer = this.mdCtrl.open(UpdateCustomerComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    updateCustomer.componentInstance.data = data;
  }
}
