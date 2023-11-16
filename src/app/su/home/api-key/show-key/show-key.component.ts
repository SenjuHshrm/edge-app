import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-key',
  templateUrl: './show-key.component.html',
  styleUrls: ['./show-key.component.scss']
})
export class ShowKeyComponent implements OnInit {

  @Input() public key!: string;
  @Input() public client!: string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
