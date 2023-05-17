import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuotationService } from './../../../services/quotation.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss']
})
export class CreateQuotationComponent implements OnInit, OnDestroy {
  @Input() public data: any = {};
  public quotations: any = [];
  public itemPlaceholder: any = [];
  public items: any = [];
  public quoteData: any = {
    itemId: '',
    description: '',
    unitPrice: '',
    price: '',
    quantity: '',
    totalPrice: '',
  };

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(private quote: QuotationService, private md: NgbActiveModal) {}

  ngOnInit(): void {
    this.data?.items?.forEach((x: any) => {
      this.items.push(x);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  displayInfo(id: string) {
    let item = this.items.filter((i: any) => {
      return i._id === id;
    });
    this.quoteData = {
      itemId: item[0]._id,
      description: item[0].description,
      unitPrice: item[0].units,
      quantity: item[0].quantity,
      totalPrice: 0,
    };
  }

  computeTotalPrice() {
    // this.quoteData.totalPrice = (this.quoteData.quantity * (+this.quoteData.price + +this.quoteData.price * 0.15)).toFixed(2);
    this.quoteData.totalPrice = (this.quoteData.quantity * +this.quoteData.price).toFixed(2)
  }

  handleSaveQuotation(e: any) {
    e.preventDefault();
    if (this.quotations.length !== 0) {
      this.loading = true;
      let req = {
        keyPartnerId: this.data.keyPartnerId._id,
        quoteFrom: this.data.inqId,
        items: this.quotations,
        validUntil: moment().add(30, 'days').format(),
      };
      let createQuotation = this.quote.createQuotation(req).subscribe({
        next: (res: any) => {
          this.md.close(res.info);
          this.loading = false;
          Swal.fire({
            title: 'Quotation successfully created.',
            icon: 'info',
          });
        },
        error: (e: any) => {
          console.log(e);
          this.loading = false;
        },
      });
      this.subs.add(createQuotation)
    } else {
      Swal.fire({
        title: 'Please select an item.',
        icon: 'info',
      });
    }
  }

  addQuotation(item: any) {
    if (item.itemId !== '') {
      if (this.validateItem(item)) {
        this.quotations.push(item);
        let i = this.items.findIndex((x: any) => x._id === item.itemId);
        this.itemPlaceholder.push(this.items[i]);
        this.items.splice(i, 1);
        this.quoteData = {
          itemId: '',
          description: '',
          unitPrice: '',
          quantity: '',
          totalPrice: '',
        };
      }
    } else {
      Swal.fire({
        title: 'Please select an item.',
        icon: 'info',
      });
    }
  }

  validateItem(data: any): boolean {
    const { description, quantity, unitPrice, price } = data;
    let message = '';

    if (description === '') {
      message = 'Please enter item description.';
    } else if (quantity === '') {
      message = 'Please enter the quantity';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(quantity)) {
      message = 'Invalid quantity value.';
    } else if (unitPrice === '') {
      message = 'Please enter the unit.';
    } else if (price === '') {
      message = 'Please enter the price.';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(price)) {
      message = 'Invalid price value.';
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

  removeFromList(i: number) {
    let ind = this.itemPlaceholder.findIndex(
      (x: any) => x._id === this.quotations[i].itemId
    );
    this.items.push(this.itemPlaceholder[ind]);
    this.quotations.splice(i, 1);
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
}
