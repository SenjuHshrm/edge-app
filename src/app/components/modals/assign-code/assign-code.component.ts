import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assign-code',
  templateUrl: './assign-code.component.html',
  styleUrls: ['./assign-code.component.scss'],
})
export class AssignCodeComponent implements OnInit {
  @Input() public id: string = '';
  @Input() public data: any;

  constructor() {}

  ngOnInit(): void {}
}
