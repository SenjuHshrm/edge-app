import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import address from 'src/assets/address';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBundleComponent } from '../bundles/update-bundle/update-bundle.component';

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

  public individualItem: any = [];
  public bundledItem: any = [];
  public selectedIndItem: string = '';
  public selectedBundleItem: string = '';
  public individualItemTable: any = [];
  public bundledItemTable: any = [];

  public indQuantity: string = '';
  public bndQuantity: string = '';

  public didCheck: boolean = false;

  public bookingData: any = {
    customer: '',
    customerContact: '',
    zip: '',
    courier: 'flash',
    cod: '',
    sender: '',
    senderContact: '',
    remarks: '',
  };

  public addr: any = {
    province: '',
    city: '',
    brgy: '',
    hsStNum: '',
  };

  public loading: boolean = false;
  public courierLoads: boolean = false;
  savingType: string = 'update';

  constructor(
    private booking: BookingService,
    private md: NgbActiveModal,
    private mdCtrl: NgbModal
  ) {}

  ngOnInit(): void {
    Object.keys(address).forEach((e) => {
      this.provinces.push(e);
    });
    this.booking.getIndividualItemByKeyPartner().subscribe({
      next: (res: any) => {
        this.individualItem = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.booking.getBundledItemByKeyPartner().subscribe({
      next: (res: any) => {
        this.bundledItem = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  handleActive(str: string) {
    this.active = str;
    if (str === 'individual') {
      this.bundledItemTable = [];
    } else {
      this.individualItemTable = [];
    }
  }

  handleTextLimit(str: string) {
    if (str.length <= 20) {
      return str;
    } else {
      return `${str.substring(0, 20)}...`;
    }
  }

  changeCities(str: string): void {
    this.didCheck = false;
    this.cities = [];
    this.brgys = [];
    Object.keys(address[str as keyof typeof address].municipality_list).forEach(
      (e) => {
        this.cities.push(e);
      }
    );
  }

  changeBrgys(str: string): void {
    this.didCheck = false;
    this.brgys = [];
    let prov = this.addr.province;
    let provs: any = address[prov as keyof typeof address].municipality_list;
    provs[str].barangay_list.map((brgy: any) => {
      this.brgys.push(brgy);
    });
  }

  checkAddress(a: any, b: any) {
    this.courierLoads = true;
    let params = {
      province: a.province,
      city: a.city,
      brgy: a.brgy,
      type: b.courier,
    };
    this.booking.checkAddress(params).subscribe({
      next: (res: any) => {
        if (res.info === 'YES') {
          Swal.fire(
            'Success',
            'The address is available for Door to Door Delivery',
            'success'
          );
          this.didCheck = true;
          this.courierLoads = false;
        } else {
          Swal.fire(
            'Error',
            'The address is not available for Door to Door Delivery',
            'error'
          );
          this.didCheck = false;
          this.courierLoads = false;
        }
      },
      error: ({ error }: any) => {
        Swal.fire(
          'Error',
          'The address is not available for Door to Door Delivery',
          'error'
        );
        this.didCheck = false;
        this.courierLoads = false;
      },
    });
  }

  addToIndividualOrderList(id: string) {
    if (id !== '') {
      if (this.individualItemTable.length === 0) {
        let i = this.individualItem.findIndex((x: any) => {
          return x._id === id;
        });
        if (
          this.validateIndividual({
            current: this.individualItem[i].currentQty,
            quantity: this.indQuantity,
          })
        ) {
          this.individualItemTable.push({
            id: this.individualItem[i]._id,
            name: this.individualItem[i].desc,
            color: this.individualItem[i].color.name,
            size: this.individualItem[i].size.name,
            quantity: this.indQuantity,
          });

          this.selectedIndItem = '';
          this.indQuantity = '';
        }
      } else {
        Swal.fire({
          title: 'Maximum of 1 Item per Booking.',
          icon: 'info',
        });
      }
    } else {
      Swal.fire({
        title: 'Please select an item.',
        icon: 'info',
      });
    }
  }

  validateIndividual(data: any): boolean {
    const { current, quantity } = data;
    let message = '';
    if (quantity === '') {
      message = 'Please enter the quantity.';
    } else if (+current < +quantity) {
      message =
        'Quantity must not exceed the current quantity of the selected item.';
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

  removeToIndividualOrderList(id: string) {
    let i = this.individualItemTable.findIndex((x: any) => {
      return x._id === id;
    });
    this.individualItemTable.splice(i, 1);
  }

  addToBundledOrderList(id: string) {
    if (id) {
      if (this.bundledItemTable.length === 0) {
        let i = this.bundledItem.findIndex((x: any) => {
          return x._id === id;
        });
        this.bundledItemTable.push({
          id: this.bundledItem[i]._id,
          name: this.bundledItem[i].name,
          quantity: this.bndQuantity,
          items: this.bundledItem[i].items,
        });
      } else {
        Swal.fire({
          title: 'Maximum of 1 Bundle per Booking.',
          icon: 'info',
        });
      }
    } else {
      Swal.fire({
        title: 'Please select a bundled item.',
        icon: 'info',
      });
    }
  }

  removeToBundledOrderList(id: string) {
    let i = this.bundledItemTable.findIndex((x: any) => {
      return x._id === id;
    });
    this.bundledItemTable.splice(i, 1);
  }

  validateData(
    booking: any,
    address: any,
    individual: any,
    bundle: any
  ): boolean {
    let message = '';

    if (booking.customer === '') {
      message = 'Please enter the receiver name.';
    } else if (booking.customerContact === '') {
      message = 'Please enter receiver phone number.';
    } else if (
      /^[0-9]+$/.test(booking.customerContact) === false ||
      booking.customerContact.length !== 11
    ) {
      message = 'Invalid receiver phone number.';
    } else if (address.province === '') {
      message = 'Please select province';
    } else if (address.city === '') {
      message = 'Please select city';
    } else if (address.brgy === '') {
      message = 'Please select barangay';
    } else if (address.hsStNum === '') {
      message = 'Please select address';
    } else if (booking.courier === '') {
      message = 'Please enter courier.';
    } else if (this.didCheck === false) {
      message = 'Please check address if available in courier.';
    } else if (booking.cod === '') {
      message = 'Please enter cod.';
    } else if (booking.sender === '') {
      message = 'Please enter sender.';
    } else if (booking.senderContact === '') {
      message = 'Please enter sender phone number.';
    } else if (
      /^[0-9]+$/.test(booking.senderContact) === false ||
      booking.senderContact.length !== 11
    ) {
      message = 'Invalid sender phone number.';
    } else if (individual.length === 0 && bundle.length === 0) {
      message = 'Please select an item.';
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

  resetCheck() {
    this.didCheck = false;
  }

  addBooking() {
    if (
      this.validateData(
        this.bookingData,
        this.addr,
        this.individualItemTable,
        this.bundledItemTable
      )
    ) {
      this.loading = true;
      let items: any = [];
      this.individualItemTable.forEach((x: any) => {
        items.push({
          itemId: x.id,
          quantity: x.quantity,
          itemType: 'individual',
        });
      });
      this.bundledItemTable.forEach((x: any) => {
        items.push({
          itemId: x.id,
          quantity: x.quantity,
          itemType: 'bundle',
        });
      });
      let req = {
        customer: this.bookingData.customer,
        customerContact: this.bookingData.customerContact,
        province: this.addr.province,
        city: this.addr.city,
        brgy: this.addr.brgy,
        hsStNum: this.addr.hsStNum,
        zip: this.bookingData.zip,
        courier: this.bookingData.courier,
        cod: this.bookingData.cod,
        sender: this.bookingData.sender,
        senderContact: this.bookingData.senderContact,
        remarks: this.bookingData.remarks,
        itemId: items[0].itemId,
        bundleId: this.bundledItemTable[0],
        quantity: items[0].quantity,
        itemType: items[0].itemType,
      };
      this.booking.addBooking(req).subscribe({
        next: (res: any) => {
          if (res.success) {
            Swal.fire('Booked successfully.', '', 'success');
            this.md.close({ success: true, data: res.info });
            this.loading = false;
          }
        },
        error: ({ error }: any) => {
          console.log(error);
          this.loading = false;
        },
      });
    }
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
        this.md.close();
      }
    });
  };

  updateBundleItem(data: any) {
    let updateBundle = this.mdCtrl.open(UpdateBundleComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    data.type = 'customize';
    updateBundle.componentInstance.current = data;
    updateBundle.result
      .then((res) => {
        if (res.success) {
          this.bundledItemTable[0].items = [...res.data.items];
        }
      })
      .catch((e) => console.log());
  }

  compareData(data: any, newData: any): string {
    const datum = {
      id: data._id,
      name: data.name,
      quantity: '',
      items: data.items,
      type: 'customize',
    };
    return JSON.stringify(datum) === JSON.stringify(newData)
      ? 'update'
      : 'customize';
  }
}
