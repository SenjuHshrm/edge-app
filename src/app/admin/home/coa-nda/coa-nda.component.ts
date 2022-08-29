import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coa-nda',
  templateUrl: './coa-nda.component.html',
  styleUrls: ['./coa-nda.component.scss'],
})
export class CoaNdaComponent implements OnInit {
  public keyPartners: any = [];
  public keyList: any = [];
  public filename: string = 'Selected File';
  public file: any;
  public sentFileHistory: any = [];

  public data: any = {
    keyPartner: '',
    keyPartnerId: '',
  };

  public loading: boolean = false;
  public progress: number = 0;

  constructor(private kp: KeyPartnerService) {}

  ngOnInit(): void {
    this.kp.getActivatedKeyPartners().subscribe({
      next: (res: any) => {
        this.keyPartners = res.info;
      },
    });

    this.kp.getContractSendingHistory('coa-nda').subscribe({
      next: (res: any) => {
        this.sentFileHistory = res.info;
      },
      error: ({ error }: any) => {},
    });
  }

  selectFile() {
    (<HTMLInputElement>document.getElementById('coa')).click();
  }

  changeFile(evt: any) {
    const name = evt.target.files[0].name;
    if (name.substring(name.lastIndexOf('.') + 1) === 'pdf') {
      this.filename = evt.target.files[0].name;
      this.file = evt.target.files[0];
    } else {
      Swal.fire('Please select a valid pdf file.', '', 'info');
      (<HTMLInputElement>document.getElementById('coa')).value = '';
    }
  }

  handleSearch(evt: any) {
    const search = evt.target.value;
    const data =
      search !== ''
        ? this.keyPartners.filter((e: any) =>
            e.email.toLowerCase().startsWith(search.toLowerCase())
          )
        : [];
    this.keyList = data;
  }

  keyListClick(id: string, name: string) {
    this.data.keyPartnerId = id;
    this.data.keyPartner = name;
    this.keyList = [];
  }

  saveContract() {
    if (this.validateContract()) {
      this.loading = true;
      let filename = `COA-NDA_${moment().format('MMDDYYYYhhmmss')}_${
        this.data.keyPartnerId
      }${this.filename.substring(
        this.filename.lastIndexOf('.'),
        this.filename.length
      )}`;
      let contractData = new FormData();
      contractData.append('id', this.data.keyPartnerId);
      contractData.append('type', 'coa-nda');
      contractData.append('filename', filename);
      contractData.append('file', this.file);
      // this.kp.saveContract(contractData).subscribe({
      //   next: (res: any) => {
      //     Swal.fire('Success', 'File sent successfully', 'success');
      //     this.loading = false;
      //     (<HTMLInputElement>document.getElementById('coa')).value = '';
      //     (<HTMLInputElement>document.getElementById('keyPartner')).value = '';
      //     this.filename = 'Selected File';
      //   },
      //   error: ({ error }: any) => {
      //     console.log(error);
      //     this.loading = false;
      //   },

      // });
      this.kp.saveContract(contractData).subscribe((evt: HttpEvent<any>) => {
        switch (evt.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round((evt.loaded / Number(evt.total)) * 100);
            break;

          case HttpEventType.Response:
            if (evt.body.success) {
              Swal.fire('Success', 'File sent successfully', 'success');
              this.loading = false;
              (<HTMLInputElement>document.getElementById('coa')).value = '';
              (<HTMLInputElement>document.getElementById('keyPartner')).value =
                '';
              this.filename = 'Selected File';
              this.progress = 0;
            } else {
              Swal.fire('Success', 'File sent successfully', 'success');
              this.progress = 0;
              this.loading = false;
            }
        }
      });
    }
  }

  validateContract(): boolean {
    let message = '';

    if (this.filename === 'Selected File') {
      message = 'Please select a document.';
    } else if (this.data.keyPartner === '') {
      message = 'Please select a key partner.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
  }
}
