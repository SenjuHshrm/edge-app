import { Component, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/services/inquiry.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-inquiry',
  templateUrl: './create-inquiry.component.html',
  styleUrls: ['./create-inquiry.component.scss'],
})
export class CreateInquiryComponent implements OnInit {
  public inquiryForm = {
    description: '',
    quantity: '',
    units: '',
    remarks: '',
  };
  public inquiry: any = [];

  constructor(private inq: InquiryService, private md: NgbActiveModal) {}

  ngOnInit(): void {}

  handleNewItem({ description, quantity, units, remarks }: any) {
    if (this.validateItem({ description, quantity, units, remarks })) {
      this.inquiry.push({
        description: description,
        quantity: quantity,
        units: units,
        remarks: remarks,
      });

      this.inquiryForm = {
        description: '',
        quantity: '',
        units: '',
        remarks: '',
      };
    }
  }

  validateItem(data: any): boolean {
    const { description, quantity, units } = data;
    let message: string = '';

    if (description === '') {
      message = 'Please enter the item description.';
    } else if (quantity === '') {
      message = 'Please enter the quantity';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(quantity)) {
      message = 'Invalid quantity value.';
    } else if (units === '') {
      message = 'Please enter the price / unit.';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(units)) {
      message = 'Invalid price/unit value.';
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
    this.inquiry.splice(i, 1);
  }

  handleSaveInquiry(e: any) {
    e.preventDefault();
    if (this.inquiry.length !== 0) {
      let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
      let data = {
        keyPartnerId: token.sub,
        items: this.inquiry,
      };
      this.inq.createInquiry(data).subscribe({
        next: (res: any) => {
          this.md.close(res.info);
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    } else {
      Swal.fire({
        title: 'Please create an item.',
        icon: 'info',
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
}
