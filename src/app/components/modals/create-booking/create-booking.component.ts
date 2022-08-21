import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import address from 'src/assets/address';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  public active = 'individual';

  public provinces: string[] = [];
  public cities: string[] = [];
  public brgys: string[] = [];

  public individualItem: any = []
  public bundledItem: any = []
  public selectedIndItem: string = ''
  public selectedBundleItem: string = ''
  public individualItemTable: any = []
  public bundledItemTable: any = []

  public indQuantity: string = ''
  public bndQuantity: string = ''

  public bookingData: any = {
    customer: '',
    customerContact: '',
    zip: '',
    courier: '',
    product: '',
    quantity: '',
    cod: '',
    sender: '',
    senderContact: '',
    remarks: ''
  }

  public addr: any = {
    province: '',
    city: '',
    brgy: '',
    hsStNum: '',
  };

  constructor(
    private booking: BookingService
  ) {}

  ngOnInit(): void {
    Object.keys(address).forEach((e) => {
      this.provinces.push(e);
    });
    this.booking.getIndividualItemByKeyPartner().subscribe({
      next: (res: any) => {
        this.individualItem = res.info
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
    this.booking.getBundledItemByKeyPartner().subscribe({
      next: (res: any) => {
        this.bundledItem = res.info
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

  handleActive(str: string) {
    this.active = str;
  }

  handleTextLimit(str: string) {
    if (str.length <= 20) {
      return str;
    } else {
      return `${str.substring(0, 20)}...`;
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
    let prov = this.addr.province;
    let provs: any = address[prov as keyof typeof address].municipality_list;
    provs[str].barangay_list.map((brgy: any) => {
      this.brgys.push(brgy);
    });
  }

  checkAddress(a: any, b: any) {
    let params = {
      province: a.province,
      city: a.city,
      brgy: a.brgy,
      type: b.courier
    }
    this.booking.checkAddress(params).subscribe({
      next: (res: any) => {
        if (res.info === 'YES') {
          Swal.fire('Success', 'The address is available for Door to Door Delivery', 'success')
        } else {
          Swal.fire('Error', 'The address is not available for Door to Door Delivery', 'error')
        }
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

  addToIndividualOrderList(id: string) {
    let i = this.individualItem.findIndex((x: any) => { return x._id === id })
    this.individualItemTable.push({
      id: this.individualItem[i]._id,
      name: this.individualItem[i].desc,
      quantity: this.indQuantity
    })
  }

  removeToIndividualOrderList(id: string) {
    let i = this.individualItemTable.findIndex((x: any) => { return x._id === id })
    this.individualItemTable.splice(i, 1)
  }

  addToBundledOrderList(id: string) {
    let i = this.bundledItem.findIndex((x: any) => { return x._id === id })
    this.bundledItemTable.push({
      id: this.bundledItem[i]._id,
      name: this.bundledItem[i].name,
      quantity: this.bndQuantity,
      items: this.bundledItem[i].items
    })
  }

  removeToBundledOrderList(id: string) {
    let i = this.bundledItemTable.findIndex((x: any) => { return x._id === id })
    this.bundledItemTable.splice(i, 1)
  }

  addBooking() {
    let items: any = []
    this.individualItemTable.forEach((x: any) => {
      items.push({
        itemId: x.id,
        quantity: x.quantity
      })
    })
    this.bundledItemTable.forEach((x: any) => {
      items.push({
        itemId: x.id,
        quantity: x.quantity
      })
    })
    let req = {
      customer: this.bookingData.customer,
      customerContact: this.bookingData.customerContact,
      province: this.addr.province,
      city: this.addr.city,
      brgy: this.addr.brgy,
      hsStNum: this.addr.hsStNum,
      zip: this.bookingData.zip,
      courier: this.bookingData.courier,
      product: this.bookingData.product,
      quantity: this.bookingData.quantity,
      cod: this.bookingData.cod,
      sender: this.bookingData.sender,
      senderContact: this.bookingData.senderContact,
      remarks: this.bookingData.remarks,
      items: items
    }
    this.booking.addBooking(req).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }
  
}
