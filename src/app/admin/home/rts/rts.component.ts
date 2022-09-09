import { Component, OnInit } from '@angular/core';
import address from 'src/assets/address';
import { BookingService } from 'src/app/services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rts',
  templateUrl: './rts.component.html',
  styleUrls: ['./rts.component.scss'],
})
export class RtsComponent implements OnInit {
  public provinces: string[] = [];
  public cities: string[] = [];
  public brgys: string[] = [];

  public addr: any = {
    province: '',
    city: '',
    brgy: '',
    hsStNum: '',
  };

  public bookingId: string = '';
  public data: any = null;
  public didSearch: boolean = false;
  public isDefective: boolean = false;
  public itemContainer: any = [];
  public sLoading: boolean = false;
  public cLoading: boolean = false;

  public newRemarks: string = '';

  constructor(private bookServ: BookingService) {}

  ngOnInit(): void {
    Object.keys(address).forEach((e) => {
      this.provinces.push(e);
    });
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
    let prov = this.addr.province;
    let provs: any = address[prov as keyof typeof address].municipality_list;
    provs[str].barangay_list.map((brgy: any) => {
      this.brgys.push(brgy);
    });
  }

  findRts(): void {
    if (this.bookingId !== '') {
      this.sLoading = true;
      this.bookServ.getOneBooking(this.bookingId).subscribe({
        next: (res: any) => {
          if (res.info) {
            this.data = res.info;
            this.newRemarks = res.info.remarks;
            this.didSearch = true;
            this.itemContainer = [];
            if (res.info.itemType === 'individual') {
              this.itemContainer.push({
                itemId: res.info.itemId._id,
                name: res.info.itemId.desc,
                quantity: res.info.quantity,
                defective: '0',
                good: '0',
              });
            } else {
              res.info.bundleId.items.map((item: any) => {
                this.itemContainer.push({
                  itemId: item.itemId,
                  name: item.item,
                  quantity: item.quantity,
                  defective: '0',
                  good: '0',
                });
              });
            }
            this.sLoading = false;
          } else {
            this.didSearch = true;
            this.data = null;
            this.sLoading = false;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.sLoading = false;
        },
      });
    } else {
      Swal.fire('Please enter Customer Booking ID.', '', 'info');
    }
  }

  saveRts() {
    if (this.handleValidation(this.itemContainer)) {
      this.cLoading = true;
      this.bookServ
        .returnBooking(this.data._id, {
          remarks: this.newRemarks,
          items: this.itemContainer,
        })
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire('Booking returned successfully.', '', 'info');
              this.data = {};
              this.didSearch = false;
              this.bookingId = '';
            } else {
              Swal.fire('Failed to return booking.', '', 'info');
            }
            this.cLoading = false;
          },
          error: (err: any) => {
            console.log(err);
            this.cLoading = false;
          },
        });
    }
  }

  handleValidation(data: any): boolean {
    let message = '';
    data.map((item: any) => {
      if (item.defective === '0' && item.good === '0') {
        message = `Please enter the quantity of good and defective of ${item.name} item.`;
        return;
      }

      let total = parseFloat(item.defective) + parseFloat(item.good);
      if (parseFloat(item.quantity) < total) {
        message = `The total of defective and good items exceeded the booked quantity of ${item.name}.`;
        return;
      }

      if (parseFloat(item.quantity) !== total) {
        message = `The total of defective and good items must be the same as the booked quantity of ${item.name}.`;
        return;
      }
    });

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
  }
}
