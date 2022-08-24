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
  // good items
  public items: any = [];
  public allItems: any = [];
  public page: any = 1;
  public size: any = 10;
  public totalpage: any = 0;
  public category: string = 'email';
  public search: string = '';

  public selectCategory: string = '';

  constructor(private mdCtrl: NgbModal, private invServ: InventoryService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
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

  createSKU(data: any): string {
    return `SKU-EC-${data.classification?.code}-${data.code?.code}-${data.color?.code}-${data.size?.code}-${data.sequence}`;
  }

  createNewItem() {
    let createBooking = this.mdCtrl.open(CreateItemComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    createBooking.result
      .then((res) => {
        if (res.success) {
          res.data.sku = this.createSKU(res.data);
          this.items = [res.data, ...this.allItems];
          this.allItems = [res.data, ...this.allItems];
          let totalPages = Math.floor(this.items.length / this.size);
          if (this.items.length % this.size > 0) totalPages += 1;
          this.totalpage = totalPages;
        }
      })
      .catch((e) => console.log());
  }

  updateItem(data: any) {
    let updateItem = this.mdCtrl.open(UpdateItemComponent, {
      size: 'lg',
    });
    updateItem.componentInstance.data = data;
    updateItem.result
      .then((res) => {
        if (res.success) {
          res.data.sku = this.createSKU(res.data);
          let ind = this.allItems.findIndex((e: any) => e._id === res.data._id);
          this.allItems[ind] = res.data;
          let ind2 = this.items.findIndex((e: any) => e._id === res.data._id);
          this.items[ind2] = res.data;
        }
      })
      .catch((e) => console.log());
  }

  viewItem(data: any) {
    let viewItem = this.mdCtrl.open(ViewItemComponent, {
      size: 'lg',
    });
    viewItem.componentInstance.data = data;
  }

  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
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
            this.allItems = this.allItems.filter(
              (e: any) => e._id !== res.info
            );
            this.items = this.items.filter((e: any) => e._id !== res.info);
            let totalPages = Math.floor(this.items.length / this.size);
            if (this.items.length % this.size > 0) totalPages += 1;
            this.totalpage = totalPages;
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

  handleSelectAll(evt: any) {
    const checks: any = document.getElementsByClassName('custom-check-me');
    if (checks.length !== 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked ? true : false;
      }
    }
  }

  handleSelect(evt: any) {
    const all: any = document.getElementById('check-all');
    if (!evt.target.checked) {
      if (all.checked) {
        all.checked = false;
      }
    }
  }

  changeNonMoving() {
    if (this.selectCategory !== '') {
      let ids: any = [];
      const checks: any = document.getElementsByClassName('custom-check-me');
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
          ids.push(checks[i].value);
        }
      }
      if (ids.length !== 0) {
        Swal.fire({
          title:
            'Are you sure you want to set the selected items as non moving?',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((res) => {
          if (res.isConfirmed) {
            this.invServ.updateManyStatus({ ids }).subscribe((res) => {
              if (res.success) {
                Swal.fire({
                  title: 'Items has been updated successfully.',
                  icon: 'success',
                });
                res.info.map((id: any) => {
                  let ind = this.allItems.findIndex((e: any) => e._id === id);
                  let ind2 = this.items.findIndex((e: any) => e._id === id);
                  this.allItems[ind].status = 'non-moving';
                  this.items[ind2].status = 'non-moving';
                });
              } else {
                Swal.fire({
                  title: 'Failed to update the status.',
                  icon: 'info',
                });
              }
            });
          } else {
            Swal.fire({
              title: 'Update cancelled.',
              icon: 'info',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'No selected item.',
          icon: 'info',
        });
      }
    } else {
      Swal.fire({
        title: 'Please select an action for the selected items.',
        icon: 'info',
      });
    }
  }
}
