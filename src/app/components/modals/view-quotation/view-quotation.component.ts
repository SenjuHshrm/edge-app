import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss']
})
export class ViewQuotationComponent implements OnInit {

  @Input() public data: any | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
