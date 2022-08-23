import { Component, Input, OnInit } from '@angular/core';
import { BundleService } from 'src/app/services/bundle.service';

@Component({
  selector: 'app-view-by-id',
  templateUrl: './view-by-id.component.html',
  styleUrls: ['./view-by-id.component.scss'],
})
export class ViewByIdComponent implements OnInit {
  @Input() private id: string = '';

  public data: any = {};
  public total = 0;

  constructor(private bundleServ: BundleService) {}

  ngOnInit(): void {
    this.bundleServ.getBundle(this.id).subscribe({
      next: (res) => {
        this.data = res.info;
        res.info.items.map((item: any) => {
          this.total += parseFloat(item.price) * parseFloat(item.quantity);
        });
      },
    });
  }

  handleMoney(amount: any): any {
    return Number(Number(amount).toFixed(2)).toLocaleString();
  }
}
