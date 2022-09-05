import { PurchaseOrderService } from './../../../services/purchase-order.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.scss'],
})
export class ViewPurchaseOrderComponent implements OnInit {
  @Input() public data: any | undefined;

  constructor(private md: NgbActiveModal, private po: PurchaseOrderService) {}

  ngOnInit(): void {}

  handleClose() {
    this.md.close();
  }

  generateFile() {
    this.po.generatePOFile(this.data.poId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.downloadFile(res.info.file, res.info.filename)
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

  downloadFile(file: string, filename: string) {
    let a = document.createElement('a')
    document.body.appendChild(a)

    let byteChars = atob(file)
    const byteNums = new Array(byteChars.length)
    for(let i = 0; i < byteChars.length; i++) {
      byteNums[i] = byteChars.charCodeAt(i)
    }
    const byteArr = new Uint8Array(byteNums)
    let blob = new Blob([byteArr], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    let url = window.URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('download', filename)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
