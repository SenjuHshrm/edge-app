import { InquiryService } from './../../../services/inquiry.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-inquiry',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.scss'],
})
export class ViewInquiryComponent implements OnInit {
  @Input() public data: any | undefined;

  constructor(private md: NgbActiveModal, private inquiry: InquiryService) {}

  ngOnInit(): void {}

  handleClose() {
    this.md.close();
  }

  generateFile() {
    this.inquiry.generateInquiryForm(this.data.inqId).subscribe({
      next: (res: any) => {
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
