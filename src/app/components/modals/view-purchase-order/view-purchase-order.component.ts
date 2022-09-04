import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.scss'],
})
export class ViewPurchaseOrderComponent implements OnInit {
  @Input() public data: any | undefined;

  constructor(private md: NgbActiveModal) {}

  ngOnInit(): void {}

  handleClose() {
    this.md.close();
  }

  generateFile() {
    this.md.close();
  }
}
