import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ExportComponent } from './../../../components/modals/export/export.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewByIdComponent } from 'src/app/components/modals/bundles/view-by-id/view-by-id.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit, OnDestroy {
  public page: number = 1;
  public limit: number = 20;
  public bookingSize: number = 0

  private isFiltered: boolean = false;
  public selectedBooking: string[] = []
  
  public bookings: any = [];
  public allData: any = [];

  public search: string = '';
  public category: string = '';
  public bookFrom: string = '';
  public bookTo: string = '';
  public status: string = 'all';
  public action: string = '';

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(private bookServ: BookingService, private mdCtrl: NgbModal) {}

  ngOnInit(): void {
    this.getBookingPerPage(this.page, this.limit)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getBookingPerPage(page: number, limit: number): void {
    let getAllBooking = this.bookServ.getAllBookingPerPage(page, limit).subscribe({
      next: (res) => {
        this.bookingSize = res.length
        this.bookings = res.info
        setTimeout(() => this.checkSelected(this.bookings), 100)
      },
      error: (error) => console.log(error),
    });
    this.subs.add(getAllBooking)
  }

  handleChangeMaxPerPage() {
    this.selectedBooking = [];
    (this.isFiltered) ? this.handleFilter() : this.getBookingPerPage(this.page, this.limit)
  }

  handlePageChange(e: any) {
    (this.isFiltered) ? this.handleFilter(e) : this.getBookingPerPage(e, this.limit)
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

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  handleSearchAndFilter() {
    this.selectedBooking = []
    this.handleFilter()
  }

  handleFilter(page?: number) {
    this.isFiltered = true
    let filterData: any = {}, searchData: any = {}
    if(this.search !== '' && this.category !== '') {
      searchData.key = this.category
      searchData.value = this.search
    }
    if(this.bookFrom !== '' && this.bookTo !== '') {
      filterData.createdAt = {
        $gte: new Date(this.bookFrom).setHours(0, 0, 0),
        $lte: new Date(this.bookTo).setHours(23, 59, 59)
      }
    }
    if(this.status !== '') {
      filterData.status = this.status
    }
    if(Object.keys(filterData).length > 0 || Object.keys(searchData).length > 0) {
      let getAllBookingFiltered = this.bookServ.getAllBookingFiltered(page || this.page, this.limit, filterData, searchData).subscribe({
        next: (res) => {
          this.bookings = res.info
          this.bookingSize = res.length
          setTimeout(() => this.checkSelected(this.bookings), 100)
        }
      })
      this.subs.add(getAllBookingFiltered)
    }
  }

  handleReset() {
    this.search = ''
    this.category = ''
    this.status = 'all'
    this.bookFrom = ''
    this.bookTo = ''
    this.isFiltered = false
    this.page = 1
    this.limit = 20
    this.selectedBooking = []
    this.getBookingPerPage(this.page, this.limit)
  }

  viewBundle(bundle: any) {
    let viewBundle = this.mdCtrl.open(ViewByIdComponent, {
      size: 'md',
    });
    viewBundle.componentInstance.current = bundle;
  }

  handleSelectAll(evt: any) {
    const checks: any = document.getElementsByClassName('select-field');
    if (checks.length !== 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked;
        (evt.target.checked) ? this.selectedBooking.push(this.bookings[i]._id) : this.selectedBooking = [...this.selectedBooking.filter((book: string) => book !== this.bookings[i]._id)]
      }
    }
    this.selectedBooking = [...new Set(this.selectedBooking)]
  }

  selectOne(evt: any, id: string) {
    (evt.target.checked) ? this.selectedBooking.push(id) : this.selectedBooking = [...this.selectedBooking.filter((book: string) => book !== id)];
    let selectAll: any = document.getElementById('checkAll');
    selectAll.checked = this.selectedBooking.length === this.limit
  }

  checkSelected(book: any) {
    let selected: number = 0
    let selectAll: any = document.getElementById('checkAll')
    book.forEach((b: any) => {
      let ind: number = this.selectedBooking.findIndex((i: string) => i === b._id)
      let checkbox: any = document.getElementById(b._id)
      if(ind === -1) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
        selected += 1
      }
    })
    selectAll.checked = (selected === book.length)
  }

  handleAction() {
    switch (this.action) {
      case '1':
        this.handleMarkAsFulfilled();
        break;
      case '2':
        this.handleExportSelected();
        break;
      default:
        console.log('Select action');
    }
  }

  handleMarkAsFulfilled() {
    if (this.selectedBooking.length > 0) {
      this.bookServ.markAsFulfilled({ ids: [...this.selectedBooking] }).subscribe({
        next: (res: any) => {
          Swal.fire('', 'Marked as fullfilled', 'success').then((_) => {
            this.bookings.forEach((x: any) => {
              let ind = this.selectedBooking.indexOf(x._id);
              if (ind !== -1) {
                x.status = 'fulfilled';
              }
            });
          });
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });
    }
  }

  handleExportSelected() {
    let selected = [];
    const checks: any = document.getElementsByClassName('select-field');
    if (checks.length !== 0) {
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
          selected.push(this.bookings[i]._id);
        }
      }
      if (selected.length > 0) {
        let exportSelected = this.bookServ.exportSelected({ ids: [...this.selectedBooking] }).subscribe({
          next: (res: any) => {
            // res.info.forEach((x: any) => {
            //   setTimeout(async () => {
            //     await this.saveFile(x.filename, x.file)
            //   }, 1000)
            // })
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
      } else {
        Swal.fire('Please select records to export.', '', 'info');
      }
    }
  }

  markOneAsFulfilled(id: string) {
    let markOneAsFulfilled = this.bookServ.markOneAsFulfilled(id).subscribe({
      next: (res: any) => {
        Swal.fire('', 'Item marked as fulfilled', 'success');
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(markOneAsFulfilled)
  }

  markOneAsUnfulfilled(id: string) {
    let markOneAsUnfulfilled = this.bookServ.markOneAsUnfulfilled(id).subscribe({
      next: (res: any) => {
        Swal.fire('', 'Item marked as unfulfilled', 'success');
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(markOneAsUnfulfilled)
  }

  exportOne(id: string) {
    let exportOne = this.bookServ.exportOne(id).subscribe({
      next: (res: any) => {
        let md: NgbModalRef = this.mdCtrl.open(ExportComponent, { size: 'lg' });
        md.componentInstance.data = [res.info];
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(exportOne)
  }
}
