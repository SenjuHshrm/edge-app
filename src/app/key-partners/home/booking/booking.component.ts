import { SocketService } from './../../../services/socket.service';
import { ExportComponent } from './../../../components/modals/export/export.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateBookingComponent } from 'src/app/components/modals/create-booking/create-booking.component';
import { BookingService } from 'src/app/services/booking.service';
import { ViewByIdComponent } from 'src/app/components/modals/bundles/view-by-id/view-by-id.component';
import Swal from 'sweetalert2';
import { UploadBookingComponent } from 'src/app/components/modals/upload-booking/upload-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit, OnDestroy {
  public page: number = 1;
  public limit: number = 20;
  public bookingSize: number = 0;
  public isFiltered: boolean = false;

  public tableHeader = [];
  public tableData: any = [];
  public bookings: any = [];
  public allData: any = [];

  public search: string = '';
  public category: string = 'sender';
  public status: string = 'all';
  public selectedDate: string = '';
  public bookFrom: string = '';
  public bookTo: string = '';

  private subs: Subscription = new Subscription()

  constructor(
    private mdCtrl: NgbModal,
    private booking: BookingService,
    private socket: SocketService) {}

  ngOnInit(): void {
    this._initSocket()
    this.getAllBooking(this.page, this.limit);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllBooking(page: number, limit: number) {
    let getAllBookingByKP = this.booking.getAllBookingByKP(page, limit).subscribe({
      next: (res: any) => {
        this.bookingSize = res.length
        this.bookings = res.info
      },
      error: (err: any) => console.log(err),
    });
    this.subs.add(getAllBookingByKP)
  }

  handlePageChange(evt: any) {
    
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
              .match(this.search.toLocaleLowerCase())
          )
        : this.allData;
    this.bookings = data;
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  handleFilter(page?: number) {
    this.isFiltered = true
    let filteredData: any = {}, searchData: any = {}
    if(this.search !== ''  && this.category !== '') {
      searchData.key = this.category;
      searchData.value = this.search;
    }

    if(this.bookFrom !== '' && this.bookTo !== '') {
      filteredData.createdAt = {
        $gte: new Date(this.bookFrom).setHours(0, 0, 0),
        $lte: new Date(this.bookTo).setHours(0, 0, 0)
      }
    }

    if(this.status !== '') {
      filteredData.status = this.status
    }

    if(Object.keys(filteredData).length > 0 || Object.keys(searchData).length > 0) {
      let getAllBookingByKPFiltered = this.booking.getAllBookingByKPFiltered(page || this.page, this.limit, filteredData, searchData).subscribe({
        next: (res: any) => {
          this.bookingSize = res.length
          this.bookings = res.info
        }
      })
      this.subs.add(getAllBookingByKPFiltered)
    }

  }

  handleChangeMaxPerPage() {
    (this.isFiltered) ? this.handleFilter() : this.getAllBooking(this.page, this.limit)
  }

  handleReset() {
    this.isFiltered = false
    this.status = 'all'
    this.search = '';
    this.category = ''
    this.bookFrom = ''
    this.bookTo = ''
    this.page = 1;
    this.limit = 20;
    this.getAllBooking(this.page, this.limit)
    // this.selectedDate = '';
  }

  viewBundle(bundle: string) {
    let viewBundle = this.mdCtrl.open(ViewByIdComponent, {
      size: 'md',
    });
    viewBundle.componentInstance.current = bundle;
  }

  export(cat: string) {
    let selected: any;
    switch (cat) {
      case 'jnt':
        selected = this.bookings.filter((x: any) => {
          return x.courier === 'jnt';
        });
        selected = selected.map((x: any) => x._id);
        break;
      case 'flash':
        selected = this.bookings.filter((x: any) => {
          return x.courier === 'flash';
        });
        selected = selected.map((x: any) => x._id);
        break;
      default:
        selected = this.bookings.map((x: any) => x._id);
    }
    let exportSelected = this.booking.exportSelected({ ids: [...selected] }).subscribe({
      next: (res: any) => {
        let md: NgbModalRef = this.mdCtrl.open(ExportComponent, {
          size: 'md',
        });
        md.componentInstance.data = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(exportSelected)
  }

  uploadBooking() {
    let md: NgbModalRef = this.mdCtrl.open(UploadBookingComponent, {
      size: 'md',
    });
    md.closed.subscribe({
      next: (res: any) => {
        res.forEach((x: any) => {
          this.bookings.unshift(x);
          this.allData.unshift(x);
        });
      },
    });
  }

  handleDeleteBooking(id: string, bookingId: string) {
    Swal.fire({
      title: `Delete booking ${bookingId}?`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((x) => {
      if (x.isConfirmed) {
        let removeBooking = this.booking.removeBooking(id).subscribe({
          next: (_) => {
            Swal.fire({
              title: `Booking ${bookingId} deleted`,
              icon: 'success',
            });
            let i = this.bookings.findIndex((j: any) => j._id === id);
            this.bookings.splice(i, 1);
          },
          error: ({ error }) => {
            console.log(error);
          },
        });
        this.subs.add(removeBooking)
      }
    });
  }

  private _initSocket(): void {
    let listenUpdateBookingStatus = this.socket.listen('booking:update-status').subscribe({
      next: (res: any) => {
        let i: number = this.bookings.findIndex((book: any) => book.bookingId === res.bookingId)
        if(i > -1) {
          this.bookings[i].status = res.status
        }
      }
    })
    this.subs.add(listenUpdateBookingStatus)
  }
}
