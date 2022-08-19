import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assign-code',
  templateUrl: './assign-code.component.html',
  styleUrls: ['./assign-code.component.scss']
})
export class AssignCodeComponent implements OnInit {

  @Input() public id: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.id)
  }

}
