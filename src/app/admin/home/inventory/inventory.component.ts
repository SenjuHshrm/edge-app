import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
export class InventoryComponent implements OnInit, OnDestroy {
  public page: any = 1;
  public limit: any = 20;
  public total: number = 0;
  public isFiltered: boolean = false;
  public viewBy: string = ''
  public selectedItems: string[] = []

  // good items
  public items: any = [];
  public allItems: any = [];
  public category: string = 'email';
  public search: string = '';

  public selectCategory: string = '';
  public loading: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(private mdCtrl: NgbModal, private invServ: InventoryService) {}

  ngOnInit(): void {
    this.getAllItems(this.page, this.limit);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  getAllItems(page: number, limit: number) {
    let getAll = this.invServ.getAll(page, limit).subscribe({
      next: (res: any) => {
        this.items = res.info
        this.total = res.length
        setTimeout(() => this.checkSelected(this.items), 100)
      }
    });
    this.subs.add(getAll)
  }

  handlePageChangeInventory(evt: any) {
    this.getAllItems(evt, this.limit)
  }

  createSKU(data: any): string {
    return `SKU-EC-${data.classification?.code}-${data.color?.code}-${data.size?.code}-${data.sequence}`;
  }

  createNewItem() {
    let createBooking = this.mdCtrl.open(CreateItemComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    createBooking.result
      .then((res) => {
        if (res.success) {
          (this.isFiltered) ? this.handleFilter() : this.getAllItems(this.page, this.limit)
        }
      })
      .catch((e) => console.log());
  }

  updateItem(data: any) {
    let updateItem = this.mdCtrl.open(UpdateItemComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    updateItem.componentInstance.data = data;
    updateItem.result
      .then((res) => {
        if (res.success) {
          (this.isFiltered) ? this.handleFilter() : this.getAllItems(this.page, this.limit);
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
        let deleteItem = this.invServ.delete(id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Item has been deleted!.',
              icon: 'success',
            });
            (this.isFiltered) ? this.handleFilter() : this.getAllItems(this.page, this.limit);
          } else {
            Swal.fire({
              title: res.msg,
              icon: 'error',
            });
          }
        });
        this.subs.add(deleteItem)
      } else {
        Swal.fire({
          title: 'Deletion cancelled.',
          icon: 'info',
        });
      }
    });
  }

  handleChangeMaxPerPage() {
    this.selectedItems = [];
    (this.isFiltered) ? this.handleFilter() : this.getAllItems(this.page, this.limit)
  }

  handlePagination(data: any, page: any, size: any): any {
    return data.slice((page - 1) * size, size + (page - 1) * size);
  }

  handleReset() {
    this.isFiltered = false
    this.search = ''
    this.category = 'email'
    this.page = 1
    this.limit = 20
    this.getAllItems(this.page, this.limit)
  }

  handleFilter(category?: any) {
    this.isFiltered = true
    this.selectedItems = []
    this.viewBy = category
    let filterData: any = {}, searchData: any = {}, sortData: any = {}
    filterData.deletedAt = ''

    if(this.viewBy === 'non-moving' || this.viewBy === 'moving') {
      filterData.status = this.viewBy
    }

    if(this.viewBy === 'in' || this.viewBy === 'out') {
      sortData.sortBy = { [this.viewBy]: -1 }
    }

    if(this.viewBy === 'balance') {
      sortData.sortBy = { currentQty: -1 }
    }

    if(this.viewBy === 'bestseller') {
      sortData.sortBy = { out: -1 }
    }

    if(this.search !== '' && this.category !== '') {
      switch(this.category) {
        case 'sku':
          let sku = this.search.split('-')
          searchData.key = 'sku'
          searchData.value = {
            classification: [sku[2], sku[3], sku[4]],
            sequence: sku[5]
          }
          break;
        case 'email':
          searchData.key = 'email'
          searchData.value = this.search
          break;
        case 'desc':
          searchData.key = 'desc'
          searchData.value = this.search
          break;
      }
    }

    let allFilter = { filterData, searchData, sortData }
    console.log(allFilter)

    let getAllFiltered = this.invServ.getAllFiltered(this.page, this.limit, allFilter).subscribe({
      next: (res: any) => {
        this.items = res.info
        this.total = res.length
        setTimeout(() => this.checkSelected(this.items), 100)
      }
    })
    this.subs.add(getAllFiltered)
  }

  handleSelectAll(evt: any) {
    const checks: any = document.getElementsByClassName('custom-check-me');
    if (checks.length !== 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked;
        (evt.target.checked) ? this.selectedItems.push(this.items[i]._id) : this.selectedItems = [...this.selectedItems.filter(item => item !== this.items[i]._id)]
      }
    }
    this.selectedItems = [...new Set(this.selectedItems)]
  }

  handleSelect(evt: any, id: string) {
    (evt.target.checked) ? this.selectedItems.push(id) : this.selectedItems = [...this.selectedItems.filter(i => i !== id)]
    let selectAll: any = document.getElementById('check-all')
    selectAll.checked = this.selectedItems.length === this.limit
  }
  
  checkSelected(item: any) {
    let selected: number = 0
    let selectAll: any = document.getElementById('check-all')
    item.forEach((i: any) => {
      let ind: number = this.selectedItems.findIndex((j: string) => j === i._id)
      let checkbox: any = document.getElementById(i._id);
      if(ind === -1) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
        selected += 1
      }
    })
    selectAll.checked = (selected === item.length)
  }

  updateManyStatus() {
    switch(this.selectCategory) {
      case 'nonmoving':
        this.changeNonMoving()
        break;
      case 'moving':
        this.changeMoving()
        break;
      case 'export':
        this.exportInv()
        break;
      case 'delete':
        this.deleteSelected()
        break;
    }
  }

  deleteSelected() {
    if(this.selectCategory !== '') {
      this.loading = true
      if(this.selectedItems.length > 0) {
        Swal.fire({
          title: 'Are you sure you want to delete the selected items?',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No'
        }).then((x) => {
          if(x.isConfirmed) {
            let deleteSelected = this.invServ.deleteSelected(this.selectedItems).subscribe({
              next: (_) => {
                Swal.fire({ title: 'Items deleted successfully', icon: 'success' })
                this.handleReset()
                this.loading = false
              },
              error: ({ error }) => {
                console.log(error)
              }
            })
            this.subs.add(deleteSelected)
          }
        })
      } else {
        Swal.fire({
          title: 'No selected item.',
          icon: 'info',
        });
        this.loading = false;
      }
    } else {
      Swal.fire({
        title: 'Please select an action for the selected items.',
        icon: 'info',
      });
      this.loading = false;
    }
  }

  changeNonMoving() {
    if (this.selectCategory !== '') {
      this.loading = true;
      if (this.selectedItems.length !== 0) {
        Swal.fire({
          title:
            'Are you sure you want to set the selected items as non moving?',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((res) => {
          if (res.isConfirmed) {
            let updateManyStatus = this.invServ.updateManyStatus({ ids: this.selectedItems }).subscribe((res) => {
              if (res.success) {
                Swal.fire({
                  title: 'Items has been updated successfully.',
                  icon: 'success',
                });
                this.handleReset()
                this.loading = false;
              } else {
                Swal.fire({
                  title: 'Failed to update the status.',
                  icon: 'info',
                });
                this.loading = false;
              }
            });
            this.subs.add(updateManyStatus)
          } else {
            Swal.fire({
              title: 'Update cancelled.',
              icon: 'info',
            });
            this.loading = false;
          }
        });
      } else {
        Swal.fire({
          title: 'No selected item.',
          icon: 'info',
        });
        this.loading = false;
      }
    } else {
      Swal.fire({
        title: 'Please select an action for the selected items.',
        icon: 'info',
      });
      this.loading = false;
    }
  }

  changeMoving() {
    if (this.selectCategory !== '') {
      this.loading = true;
      if (this.selectedItems.length > 0) {
        Swal.fire({
          title:
            'Are you sure you want to set the selected items as non moving?',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((res) => {
          if (res.isConfirmed) {
            let updateManyMoving = this.invServ.updateManyMoving({ ids: this.selectedItems }).subscribe((res) => {
              if (res.success) {
                Swal.fire({
                  title: 'Items has been updated successfully.',
                  icon: 'success',
                });
                this.handleReset()
                this.loading = false;
              } else {
                Swal.fire({
                  title: 'Failed to update the status.',
                  icon: 'info',
                });
                this.loading = false;
              }
            });
            this.subs.add(updateManyMoving)
          } else {
            Swal.fire({
              title: 'Update cancelled.',
              icon: 'info',
            });
            this.loading = false;
          }
        });
      } else {
        Swal.fire({
          title: 'No selected item.',
          icon: 'info',
        });
        this.loading = false;
      }
    } else {
      Swal.fire({
        title: 'Please select an action for the selected items.',
        icon: 'info',
      });
      this.loading = false;
    }
  }

  exportInv() {
    if(this.selectCategory !== '') {
      this.loading = true
      if(this.selectedItems.length > 0) {
        let exportSelected = this.invServ.exportSelected(this.selectedItems).subscribe({
          next: (res: any) => {
            this.loading = false
            this.downloadFile(res.info.file, res.info.filename);
          },
          error: ({ error }: any) => {
            this.loading = false
            console.log(error);
          }
        });
        this.subs.add(exportSelected)
      } else {
        Swal.fire({
          title: 'No selected item.',
          icon: 'info',
        });
        this.loading = false;
      }
    } else {
      Swal.fire({
        title: 'Please select an action for the selected items.',
        icon: 'info',
      });
      this.loading = false;
    }
  }

  downloadFile(file: string, filename: string) {
    let a = document.createElement('a');
    document.body.appendChild(a);

    let byteChars = atob(file);
    const byteNums = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNums[i] = byteChars.charCodeAt(i);
    }
    const byteArr = new Uint8Array(byteNums);
    let blob = new Blob([byteArr], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    let url = window.URL.createObjectURL(blob);
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('download', filename);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
