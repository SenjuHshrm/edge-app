import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-quotation',
  templateUrl: './my-quotation.component.html',
  styleUrls: ['./my-quotation.component.scss']
})
export class MyQuotationComponent implements OnInit {
  
  tableDatas: any = [, , , ,];
  constructor() { }

  ngOnInit(): void {
  }

}
