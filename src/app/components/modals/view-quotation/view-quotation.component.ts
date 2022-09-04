import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss'],
})
export class ViewQuotationComponent implements OnInit {
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
