import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewByIdComponent } from 'src/app/components/modals/bundles/view-by-id/view-by-id.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit {
  public bookings: any = [];
  public allData: any = [];

  public search: string = '';
  public category: string = 'keyPartnerId';
  public selectedDate: string = '';
  public status: string = 'all';

  constructor(private bookServ: BookingService, private mdCtrl: NgbModal) {}

  ngOnInit(): void {
    this.bookServ.getAllBooking().subscribe({
      next: (res) => {
        this.bookings = [...res.info];
        this.allData = [...res.info];
      },
      error: (error) => console.log(error),
    });
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
}
