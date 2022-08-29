import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit {
  public keyPartners: any = [];
  public keyList: any = [];
  public filename: string = 'Selected File';
  public file: any;
  public sentFileHistory: any = [];

  public data = {
    keyPartner: '',
    keyPartnerId: '',
  };

  public loading: boolean = false;

  constructor(private kp: KeyPartnerService) {}

  ngOnInit(): void {
    this.kp.getActivatedKeyPartners().subscribe({
      next: (res: any) => {
        this.keyPartners = res.info;
      },
    });

    this.kp.getContractSendingHistory('soa').subscribe({
      next: (res: any) => {
        this.sentFileHistory = res.info;
      },
      error: ({ error }: any) => {},
    });
  }

  selectFile() {
    (<HTMLInputElement>document.getElementById('soa')).click();
  }

  changeFile(evt: any) {
    this.filename = evt.target.files[0].name;
    this.file = evt.target.files[0];
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
      let filename = `SOA_${moment().format('MMDDYYYYhhmmss')}_${
        this.data.keyPartnerId
      }${this.filename.substring(
        this.filename.lastIndexOf('.'),
        this.filename.length
      )}`;
      let contractData = new FormData();
      contractData.append('id', this.data.keyPartnerId);
      contractData.append('type', 'soa');
      contractData.append('filename', filename);
      contractData.append('file', this.file);
      this.kp.saveContract(contractData).subscribe({
        next: (res: any) => {
          Swal.fire('Success', 'File sent successfully', 'success');
          this.loading = false;
        },
        error: ({ error }: any) => {
          console.log(error);
          this.loading = false;
        },
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
