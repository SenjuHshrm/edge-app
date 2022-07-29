import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  public active: string = 'individual';

  public bundle: any = [
    {
      date: '',
      name: '',
      description: '',
      quantity: '',
      price: '',
      color: '',
      size: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleActive(str: string) {
    this.active = str;
  }

  handleNewItem() {
    this.bundle.push({
      date: '',
      name: '',
      description: '',
      quantity: '',
      price: '',
      color: '',
      size: '',
    });
  }
}
