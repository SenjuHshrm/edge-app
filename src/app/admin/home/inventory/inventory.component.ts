import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateItemComponent } from 'src/app/components/modals/create-item/create-item.component';
import { UpdateItemComponent } from 'src/app/components/modals/inventory/update-item/update-item.component';
import { ViewItemComponent } from 'src/app/components/modals/inventory/view-item/view-item.component';
import { InventoryService } from 'src/app/services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  public tableData = [{}, {}, {}, {}, {}];
  public items: any = [];
  public allItems: any = [];
  public page: any = 1;
  public size: any = 10;
  public totalpage: any = 0;
  public category: string = 'email';
  public search: string = '';

  constructor(private mdCtrl: NgbModal, private invServ: InventoryService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }

  getAllItems() {
    this.invServ.getAll().subscribe((res) => {
      if (res.success) {
        let totalPages = Math.floor(res.info.length / this.size);
        if (res.info.length % this.size > 0) totalPages += 1;
        this.totalpage = totalPages;
        this.items = res.info;
        this.allItems = res.info;
      }
    });
  }

  createNewItem() {
    let createBooking = this.mdCtrl.open(CreateItemComponent, {
      size: 'lg',
    });
    createBooking.result
      .then((res) => {
        if (res.success) {
          this.getAllItems();
        }
      })
      .catch((e) => console.log());
  }

  updateItem(data: any) {
    let updateItem = this.mdCtrl.open(UpdateItemComponent, {
      size: 'lg',
    });
    updateItem.componentInstance.data = data;
  }

  viewItem(data: any) {
    let viewItem = this.mdCtrl.open(ViewItemComponent, {
      size: 'lg',
    });
    viewItem.componentInstance.data = data;
  }

  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.invServ.delete(id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Item has been deleted!.',
              icon: 'success',
            });
            this.getAllItems();
          } else {
            Swal.fire({
              title: res.msg,
              icon: 'error',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Deletion cancelled.',
          icon: 'info',
        });
      }
    });
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
    switch (this.category) {
      case 'email':
        data =
          this.search !== ''
            ? this.allItems.filter((e: any) =>
                e.keyPartnerId.email
                  .toLowerCase()
                  .startsWith(this.search.toLowerCase())
              )
            : this.allItems;
        break;

      case 'sku':
        data =
          this.search !== ''
            ? this.allItems.filter((e: any) =>
                e.sku.toLowerCase().startsWith(this.search.toLowerCase())
              )
            : this.allItems;
        break;

      default:
        data =
          this.search !== ''
            ? this.allItems.filter((e: any) =>
                e.desc.toLowerCase().startsWith(this.search.toLowerCase())
              )
            : this.allItems;
        break;
    }

    this.items = data;
    let totalPages = Math.floor(data.length / this.size);
    if (data.length % this.size > 0) totalPages += 1;
    this.page = 1;
    this.totalpage = totalPages;
  }
}
