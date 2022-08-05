import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() public inputType: string = '';
  @Input() public name: string = '';
  @Input() public label: string = '';
  @Input() public value: string = '';
  @Input() public max: number = 100;
  @Input() public required: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
