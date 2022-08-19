import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-keypartner',
  templateUrl: './update-keypartner.component.html',
  styleUrls: ['./update-keypartner.component.scss'],
})
export class UpdateKeypartnerComponent implements OnInit {
  @Input() id: string = '';

  constructor() {}

  ngOnInit(): void {}
}
