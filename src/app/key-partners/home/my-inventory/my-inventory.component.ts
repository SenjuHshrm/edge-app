import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import { CreateBundleComponent } from 'src/app/components/modals/create-bundle/create-bundle.component';
import { ViewItemComponent } from 'src/app/components/modals/inventory/view-item/view-item.component';
import { InventoryService } from 'src/app/services/inventory.service';
import { BundleService } from 'src/app/services/bundle.service';
import { ViewBundleComponent } from 'src/app/components/modals/bundles/view-bundle/view-bundle.component';
import Swal from 'sweetalert2';
import { UpdateBundleComponent } from 'src/app/components/modals/bundles/update-bundle/update-bundle.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-inventory',
  templateUrl: './my-inventory.component.html',
  styleUrls: ['./my-inventory.component.scss'],
})
export class MyInventoryComponent implements OnInit, OnDestroy {
  public page: number = 1;
  public limit: number = 20;
  public totalItems: number = 0;
  public isFiltered: boolean = false;
  public viewBy: string = '';
  public selectedItems: string[] = []


  public tableData = [{}, {}, {}, {}, {}];

  // items
  public items: any = [];
  public allItems: any = [];
  public size: any = 10;
  public totalpage: any = 0;
  public search: string = '';

  // bundles
  public bundles: any = [];
  public allBundles: any = [];
  public bPage: any = 1;
  public bSize: any = 10;
  public bTotalpage: any = 0;
  public bSearch: string = '';

  private subs: Subscription = new Subscription()

  constructor(
    private mdCtrl: NgbModal,
    private invServ: InventoryService,
    private bundleServ: BundleService
  ) {}

  ngOnInit(): void {
    this.getAllItems(this.page, this.limit);
    this.getAllBundles();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllItems(page: number, limit: number) {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    let getAllByKeyPartners = this.invServ.getAllByKeyPartners(token.sub, page, limit).subscribe((res) => {
      if (res.success) {
        this.items = res.info;
        this.totalItems = res.length
      }
    });
    this.subs.add(getAllByKeyPartners)
  }

  viewItem(data: any) {
    let viewItem = this.mdCtrl.open(ViewItemComponent, {
      size: '',
      windowClass: 'custom-inventory-modal',
    });
    viewItem.componentInstance.data = data;
  }

  handlePagination(data: any, page: any, size: any): any {
    return data.slice((page - 1) * size, size + (page - 1) * size);
  }

  handlePageChangeInventory(evt: any) {
    this.getAllItems(evt, this.limit)
  }

  handleSearch() {
    let data: any = [];

    data =
      this.search !== ''
        ? this.allItems.filter((e: any) =>
            e.desc.toLowerCase().match(this.search.toLowerCase())
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
      case 'non-moving':
        this.items = this.allItems.filter((i: any) => i.status === category)
        break;
      case 'moving':
        this.items = this.allItems.filter((i: any) => i.status === category)
        break;
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

  // Bundles

  getAllBundles() {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    let getAllByKeyPartners = this.bundleServ.getAllByKeyPartners(token.sub).subscribe((res) => {
      if (res.success) {
        this.bundles = res.info;
        this.allBundles = res.info;
        let bTotalPages = Math.floor(res.info.length / this.size);
        if (res.info.length % this.size > 0) bTotalPages += 1;
        this.bTotalpage = bTotalPages;
      }
    });
    this.subs.add(getAllByKeyPartners)
  }

  createBundleItem() {
    let createBundle = this.mdCtrl.open(CreateBundleComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    createBundle.result
      .then((res) => {
        if (res.success) {
          this.getAllItems(this.page, this.limit);
          this.getAllBundles();
        }
      })
      .catch((e) => console.log());
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  viewBundleItem(data: any) {
    let viewBundle = this.mdCtrl.open(ViewBundleComponent, {
      size: 'lg',
    });
    viewBundle.componentInstance.data = data;
  }

  updateBundleItem(data: any) {
    let updateBundle = this.mdCtrl.open(UpdateBundleComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    data.type = 'update';
    updateBundle.componentInstance.current = data;
    updateBundle.result
      .then((res) => {
        if (res.success) {
          this.getAllBundles();
          this.getAllItems(this.page, this.limit);
        }
      })
      .catch((e) => console.log());
  }

  deleteBundle(id: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this bundle?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((response) => {
      if (response.isConfirmed) {
        let del = this.bundleServ.delete(id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Successfully delete.',
              icon: 'success',
            });
            this.allBundles = this.allBundles.filter(
              (e: any) => e._id !== res.info
            );
            this.bundles = this.bundles.filter((e: any) => e._id !== res.info);
            let bTotalPages = Math.floor(this.items.length / this.size);
            if (this.items.length % this.size > 0) bTotalPages += 1;
            this.totalpage = bTotalPages;
          } else {
            Swal.fire({
              title: 'Failed to delete the bundle record.',
              icon: 'error',
            });
          }
        });
        this.subs.add(del)
      } else {
        Swal.fire({
          title: 'Deletion cancelled.',
          icon: 'info',
        });
      }
    });
  }

  handleAmount(data: any): any {
    let total = 0;
    data.map((item: any) => {
      total += parseFloat(item.quantity) * parseFloat(item.price);
    });
    return Number(Number(total).toFixed(2)).toLocaleString();
  }

  handleSearchBundle() {
    let data: any = [];
    data =
      this.bSearch !== ''
        ? this.allBundles.filter((e: any) =>
            e.name.toLowerCase().startsWith(this.bSearch.toLowerCase())
          )
        : this.allBundles;

    this.bundles = data;
    let bTotalPages = Math.floor(data.length / this.size);
    if (data.length % this.size > 0) bTotalPages += 1;
    this.bPage = 1;
    this.bTotalpage = bTotalPages;
  }

  handleBPage(str: string) {
    if (str === 'next') {
      if (this.bPage < this.bTotalpage) {
        this.bPage += 1;
      }
    } else {
      if (this.bPage > 1) {
        this.bPage -= 1;
      }
    }
  }

  exportInv() {
    let exportByKeyPartner = this.invServ.exportByKeyPartner().subscribe({
      next: (res: any) => {
        this.downloadFile(res.info.file, res.info.filename);
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(exportByKeyPartner)
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
