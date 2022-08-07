import { Component, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/services/inquiry.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';

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
  }
  public inquiry: any = [];

  constructor(
    private inq: InquiryService,
    private md: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  handleNewItem({ description, quantity, units, remarks }: any) {
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
    }
  }

  removeFromList(i: number) {
    this.inquiry.splice(i, 1)
  }

  handleSaveInquiry(e: any) {
    e.preventDefault();
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any)
    let data = {
      keyPartnerId: token.sub,
      items: this.inquiry
    }
    this.inq.createInquiry(data).subscribe({
      next: (res: any) => {
        this.md.close(res.info)
      },
      error: (e: any) => {
        console.log(e)
      }
    })
  }
}
