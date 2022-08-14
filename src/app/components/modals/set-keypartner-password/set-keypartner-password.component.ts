import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set-keypartner-password',
  templateUrl: './set-keypartner-password.component.html',
  styleUrls: ['./set-keypartner-password.component.scss']
})
export class SetKeypartnerPasswordComponent implements OnInit {

  @Input() public id: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
