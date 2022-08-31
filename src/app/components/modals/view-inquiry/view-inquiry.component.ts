import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-inquiry',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.scss'],
})
export class ViewInquiryComponent implements OnInit {
  @Input() public data: any | undefined;

  constructor(private md: NgbActiveModal) {}

  ngOnInit(): void {}

  handleClose() {
    this.md.close();
  }
}
