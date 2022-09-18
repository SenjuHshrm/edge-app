import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  @Input() public data: any;

  constructor() {}

  ngOnInit(): void {
    let divElement = document.getElementById('files');
    this.data?.forEach(async (x: any) => {
      if (x !== null) {
        let a = document.createElement('a');
        a.setAttribute('href', `${environment.apiV1}${x.link}`);
        a.setAttribute('download', x.filename);
        a.setAttribute('target', '_blank');
        a.innerText = x.filename;
        divElement?.appendChild(a);
      }
    });
  }
}
