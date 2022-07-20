import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-inquiry',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.scss']
})
export class ViewInquiryComponent implements OnInit {

  @Input() public data: any | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
