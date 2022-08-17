import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import { CreateBundleComponent } from 'src/app/components/modals/create-bundle/create-bundle.component';
import { ViewItemComponent } from 'src/app/components/modals/inventory/view-item/view-item.component';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-my-inventory',
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.scss'],
})
export class MyInventoryComponent implements OnInit {
  public tableData = [{}, {}, {}, {}, {}];
  public items: any = [];
  public allItems: any = [];
  public page: any = 1;
  public size: any = 10;
  public totalpage: any = 0;
  public search: string = '';

  constructor(private mdCtrl: NgbModal, private invServ: InventoryService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  createBundleItem() {
    let createCustomer = this.mdCtrl.open(CreateBundleComponent, {
      size: 'lg',
    });
    createCustomer.result
      .then((res) => {
        if (res.success) {
          console.log(res.data);
        }
      })
      .catch((e) => console.log());
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  getAllItems() {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.invServ.getAllByKeyPartners(token.sub).subscribe((res) => {
      if (res.success) {
        this.items = res.info;
        this.allItems = res.info;
        let totalPages = Math.floor(res.info.length / this.size);
        if (res.info.length % this.size > 0) totalPages += 1;
        this.totalpage = totalPages;
      }
    });
  }

  viewItem(data: any) {
    let viewItem = this.mdCtrl.open(ViewItemComponent, {
      size: 'lg',
    });
    viewItem.componentInstance.data = data;
  }

  handlePagination(data: any, page: any, size: any): any {
    return data.slice((page - 1) * size, size + (page - 1) * size);
  }

  handlePage(str: string) {
    if (str === 'next') {
      if (this.page < this.totalpage) {
        this.page += 1;
      }
    } else {
      if (this.page > 1) {
        this.page -= 1;
      }
    }
  }

  handleSearch() {
    let data: any = [];

    data =
      this.search !== ''
        ? this.allItems.filter((e: any) =>
            e.desc.toLowerCase().startsWith(this.search.toLowerCase())
          )
        : this.allItems;

    this.items = data;
    let totalPages = Math.floor(data.length / this.size);
    if (data.length % this.size > 0) totalPages += 1;
    this.page = 1;
    this.totalpage = totalPages;
  }

  handleSort(category: any) {
    switch (category) {
      case 'in':
        this.items.sort(
          (a: any, b: any) => parseFloat(b.in) - parseFloat(a.in)
        );
        break;

      case 'out':
        this.items.sort(
          (a: any, b: any) => parseFloat(b.out) - parseFloat(a.out)
        );
        break;

      case 'balance':
        this.items.sort(
          (a: any, b: any) =>
            parseFloat(b.currentQty) - parseFloat(a.currentQty)
        );
        break;

      case 'bestseller':
        this.items.sort(
          (a: any, b: any) => parseFloat(b.out) - parseFloat(a.out)
        );
        break;

      default:
        this.items = this.allItems;
        break;
    }
  }
}
