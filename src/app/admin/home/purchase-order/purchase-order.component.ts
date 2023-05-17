import { ExportComponent } from './../../../components/modals/export/export.component';
import { PurchaseOrderService } from './../../../services/purchase-order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPurchaseOrderComponent } from 'src/app/components/modals/view-purchase-order/view-purchase-order.component';
import { CreatePurchaseOrderComponent } from 'src/app/components/modals/create-purchase-order/create-purchase-order.component';
import jwtDecode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit, OnDestroy {
  public poLs: any = [];
  public allData: any = [];
  public search: string = '';
  public userId: string = ''

  private subs: Subscription = new Subscription()

  constructor(private mdCtrl: NgbModal, private po: PurchaseOrderService) {}

  ngOnInit(): void {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    this.userId = token.sub
    let getAllPurchaseOrder = this.po.getAllPurchaseOrder().subscribe({
      next: (res: any) => {
        this.poLs = res.info;
        this.allData = res.info;
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(getAllPurchaseOrder)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  createPurchaseOrder() {
    let createPO = this.mdCtrl.open(CreatePurchaseOrderComponent, {
      size: 'xl',
    });
  }

  viewPurchaseOrder(data: any) {
    let viewPO = this.mdCtrl.open(ViewPurchaseOrderComponent, {
      size: 'xl',
      fullscreen: 'lg',
    });
    viewPO.componentInstance.data = data;
    if(data.seenBy.indexOf(this.userId) === -1) {
      let setPOAsSeen = this.po.setPOAsSeen(data._id).subscribe({
        next: (res: any) => {
          let poLsId = this.poLs.findIndex((x: any) => x._id === data._id)
          this.poLs[poLsId].seenBy.push(res.info)
        },
        error: ({error}: any) => {
          console.log(error)
        }
      })
      this.subs.add(setPOAsSeen)
    }
  }

  handleSelectAll(evt: any) {
    let checks: any = document.getElementsByClassName('custom-check-me');
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked ? true : false;
      }
    }
  }

  downloadSelected() {
    let selected: string[] = [];
    const checks: any = document.getElementsByClassName('custom-check-me');
    if (checks.length > 0) {
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) selected.push(this.poLs[i].poId);
      }
      if (selected.length > 0) {
        let generateMultiplePO = this.po.generateMultiplePO(selected).subscribe({
          next: (res) => {
            let md = this.mdCtrl.open(ExportComponent, { size: 'md' });
            md.componentInstance.data = [res.info];
          },
          error: ({ error }) => {
            console.log(error);
          },
        });
        this.subs.add(generateMultiplePO)
      }
    }
  }

  handleSearch() {
    const data =
      this.search !== ''
        ? this.allData.filter((e: any) =>
            e.poId
              .toLocaleLowerCase()
              .startsWith(this.search.toLocaleLowerCase())
          )
        : this.allData;
    this.poLs = data;
  }
}
