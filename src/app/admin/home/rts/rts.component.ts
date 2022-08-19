import { Component, OnInit } from '@angular/core';
import address from 'src/assets/address';

@Component({
  selector: 'app-rts',
  templateUrl: './rts.component.html',
  styleUrls: ['./rts.component.scss'],
})
export class RtsComponent implements OnInit {
  public provinces: string[] = [];
  public cities: string[] = [];
  public brgys: string[] = [];

  public addr: any = {
    province: '',
    city: '',
    brgy: '',
    hsStNum: '',
  };

  constructor() {}

  ngOnInit(): void {
    Object.keys(address).forEach((e) => {
      this.provinces.push(e);
    });
  }

  changeCities(str: string): void {
    this.cities = [];
    this.brgys = [];
    Object.keys(address[str as keyof typeof address].municipality_list).forEach(
      (e) => {
        this.cities.push(e);
      }
    );
  }

  changeBrgys(str: string): void {
    this.brgys = [];
    let prov = this.addr.province;
    let provs: any = address[prov as keyof typeof address].municipality_list;
    provs[str].barangay_list.map((brgy: any) => {
      this.brgys.push(brgy);
    });
  }
}
