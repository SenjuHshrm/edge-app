import { ExportComponent } from './../../../components/modals/export/export.component';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewByIdComponent } from 'src/app/components/modals/bundles/view-by-id/view-by-id.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit {
  public bookings: any = [];
  public allData: any = [];

  public search: string = '';
  public category: string = 'keyPartnerId';
  public selectedDate: string = '';
  public status: string = 'all';
  public action: string = '';

  constructor(private bookServ: BookingService, private mdCtrl: NgbModal) {}

  ngOnInit(): void {
    this.bookServ.getAllBooking().subscribe({
      next: (res) => {
        this.bookings = [...res.info];
        this.allData = [...res.info];
      },
      error: (error) => console.log(error),
    });
  }

  handleProduct(data: any): string {
    if (data.itemId) {
      return data.itemId.desc;
    } else {
      return data.bundleId.name;
    }
  }

  handleQuantity(data: any): string {
    if (data.itemId) {
      return data.quantity;
    } else {
      return 'bundle';
    }
  }

  handleDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  handleSearch() {
    const data =
      this.search !== ''
        ? this.allData.filter((e: any) =>
            e[this.category]
              .toLocaleLowerCase()
              .startsWith(this.search.toLocaleLowerCase())
          )
        : this.allData;
    this.bookings = data;
  }

  handleStatusFilter() {
    switch (this.status) {
      case 'fulfilled':
        this.bookings = this.allData.filter(
          (e: any) => e.status === 'fulfilled'
        );
        break;

      case 'unfulfilled':
        this.bookings = this.allData.filter(
          (e: any) => e.status === 'unfulfilled'
        );
        break;

      default:
        this.bookings = this.allData;
        break;
    }
  }

  handleDateFilter() {
    this.bookings = this.allData.filter(
      (e: any) =>
        new Date(e.createdAt).toLocaleDateString() ===
        new Date(this.selectedDate).toLocaleDateString()
    );
  }

  handleReset() {
    this.bookings = this.allData;
    this.selectedDate = '';
  }

  viewBundle(id: string) {
    let viewBundle = this.mdCtrl.open(ViewByIdComponent, {
      size: 'md',
    });
    viewBundle.componentInstance.id = id;
  }

  handleSelectAll(evt: any) {
    const checks: any = document.getElementsByClassName('select-field')
    if(checks.length !== 0) {
      for(let i = 0; i < checks.length; i++) {
        checks[i].checked = evt.target.checked ? true : false
      }
    }
  }

  handleAction() {
    switch(this.action) {
      case "1":
        break;
      case "2":
        this.handleExportSelected()
        break;
      default:
        console.log('Select action')
    }
  }

  handleExportSelected() {
    let selected = []
    const checks: any = document.getElementsByClassName('select-field')
    if(checks.length !== 0) {
      for(let i = 0; i < checks.length; i++) {
        if(checks[i].checked) {
          selected.push(this.bookings[i]._id)
        }
      }
      if(selected.length > 0) {
        this.bookServ.exportSelected({ ids: [...selected] }).subscribe({
          next: (res: any) => {
            // res.info.forEach((x: any) => {
            //   setTimeout(async () => {
            //     await this.saveFile(x.filename, x.file)
            //   }, 1000)
            // })
            let md: NgbModalRef = this.mdCtrl.open(ExportComponent, { size: 'md' })
            md.componentInstance.data = res.info
          },
          error: ({ error }: any) => {
            console.log(error)
          }
        })
      }
    }
  }

  async saveFile(filename: string, file: any) {
    if(file !== null) {
      let a = document.createElement('a')
      document.body.appendChild(a)
      let byteCharacters = atob(file)
      const byteNumbers = new Array(byteCharacters.length)
      for(let i = 0; byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      let blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      let url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }
}
