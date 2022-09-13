import { ExportComponent } from './../../../components/modals/export/export.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CreateBookingComponent } from 'src/app/components/modals/create-booking/create-booking.component';
import { BookingService } from 'src/app/services/booking.service';
import { ViewByIdComponent } from 'src/app/components/modals/bundles/view-by-id/view-by-id.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public tableHeader = [];
  public tableData: any = [];
  public bookings: any = [];
  public allData: any = [];

  public search: string = '';
  public category: string = 'sender';
  public status: string = 'all';
  public selectedDate: string = '';

  constructor(private mdCtrl: NgbModal, private booking: BookingService) {}

  ngOnInit(): void {
    this.getAllBooking();
  }

  getAllBooking() {
    this.booking.getAllBookingByKP().subscribe({
      next: (res: any) => {
        let sorted = res.info.sort((a: any, b: any) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        this.bookings = [...sorted];
        this.allData = [...sorted];
      },
      error: (err: any) => console.log(err),
    });
  }

  createNewBooking() {
    let createBooking = this.mdCtrl.open(CreateBookingComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    createBooking.result
      .then((res) => {
        if (res.success) {
          this.bookings = [res.data, ...this.bookings];
          this.allData = [res.data, ...this.allData];
        }
      })
      .catch(() => console.log());
  }

  handleProduct(data: any): string {
    if (data.itemId) {
      return data.itemId.desc;
    } else {
      return data.bundleId.name;
    }
  }

  handleQuantity(data: any): string {
    if (data.itemId) {
      return data.quantity;
    } else {
      return 'bundle';
    }
  }

  handleSearch() {
    const data =
      this.search !== ''
        ? this.allData.filter((e: any) =>
            e[this.category]
              .toLocaleLowerCase()
              .startsWith(this.search.toLocaleLowerCase())
          )
        : this.allData;
    this.bookings = data;
  }

  handleStatusFilter() {
    switch (this.status) {
      case 'fulfilled':
        this.bookings = this.allData.filter(
          (e: any) => e.status === 'fulfilled'
        );
        break;

      case 'unfulfilled':
        this.bookings = this.allData.filter(
          (e: any) => e.status === 'unfulfilled'
        );
        break;

      default:
        this.bookings = this.allData;
        break;
    }
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  handleDateFilter() {
    this.bookings = this.allData.filter(
      (e: any) =>
        new Date(e.createdAt).toLocaleDateString() ===
        new Date(this.selectedDate).toLocaleDateString()
    );
  }

  handleReset() {
    this.bookings = this.allData;
    this.selectedDate = '';
  }

  viewBundle(id: string) {
    let viewBundle = this.mdCtrl.open(ViewByIdComponent, {
      size: 'md',
    });
    viewBundle.componentInstance.id = id;
  }

  export(cat: string) {
    let selected: any;
    switch(cat) {
      case 'jnt':
        selected = this.bookings.filter((x: any) => { return x.courier === 'jnt' })
        selected = selected.map((x: any) => x._id)
        break;
      case 'flash':
        selected = this.bookings.filter((x: any) => { return x.courier === 'flash' })
        selected = selected.map((x: any) => x._id)
        break;
      default:
        selected = this.bookings.map((x: any) => x._id)
    }
    this.booking.exportSelected({ ids: [...selected] }).subscribe({
      next: (res: any) => {
        let md: NgbModalRef = this.mdCtrl.open(ExportComponent, {
          size: 'md'
        })
        md.componentInstance.data = res.info
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }
}
