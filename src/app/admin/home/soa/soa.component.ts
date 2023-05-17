import { ContractService } from './../../../services/contract.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit, OnDestroy {
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
  public progress: number = 0;

  private subs: Subscription = new Subscription()

  constructor(
    private kp: KeyPartnerService,
    private contract: ContractService
  ) {}

  ngOnInit(): void {
    let getActivatedKeyPartners = this.kp.getActivatedKeyPartners().subscribe({
      next: (res: any) => {
        this.keyPartners = res.info;
      },
    });

    let getContractSendingHistory = this.kp.getContractSendingHistory('soa').subscribe({
      next: (res: any) => {
        res.info.forEach((x: any) => {
          let i = x.file.lastIndexOf('/')
          this.sentFileHistory.push({ 
            ...x,
            url: `${environment.apiV1}${x.url}`
          })
        })
      },
      error: ({ error }: any) => {},
    });
    this.subs.add(getActivatedKeyPartners)
    this.subs.add(getContractSendingHistory)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  selectFile() {
    (<HTMLInputElement>document.getElementById('soa')).click();
  }

  changeFile(evt: any) {
    const name = evt.target.files[0].name;
    if (name.substring(name.lastIndexOf('.') + 1) === 'pdf') {
      this.filename = evt.target.files[0].name;
      this.file = evt.target.files[0];
    } else {
      Swal.fire('Please select a valid pdf file.', '', 'info');
      (<HTMLInputElement>document.getElementById('soa')).value = '';
    }
  }

  handleSearch(evt: any) {
    const search = evt.target.value;
    const data =
      search !== ''
        ? this.keyPartners.filter((e: any) =>
            e.company.toLowerCase().startsWith(search.toLowerCase())
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
      let saveContract = this.kp.saveContract(contractData).subscribe((evt: HttpEvent<any>) => {
        switch (evt.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round((evt.loaded / Number(evt.total)) * 100);
            break;

          case HttpEventType.Response:
            if (evt.body.success) {
              Swal.fire('Success', 'File sent successfully', 'success');
              this.loading = false;
              (<HTMLInputElement>document.getElementById('soa')).value = '';
              (<HTMLInputElement>document.getElementById('keyPartner')).value =
                '';
              this.filename = 'Selected File';
              this.progress = 0;
              this.sentFileHistory.unshift({ ...evt.body.info, url: `${environment.apiV1}${evt.body.info.url}` })
            }
        }
      });
      this.subs.add(saveContract)
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

  handleDelete(id: string, kp: string) {
    Swal.fire({
      text: `Are you sure to delete SOA for key partner: ${kp}`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(q => {
      if(q.isConfirmed) {
        let deleteContract = this.contract.deleteContract(id).subscribe({
          next: (_) => {
            Swal.fire({
              text: 'Contract deleted',
              icon: 'success'
            })
            let ind: number = this.sentFileHistory.findIndex((x: any) => x._id === id)
            this.sentFileHistory.splice(ind, 1)
          },
          error: (_) => {
            Swal.fire({
              text: 'An error occured',
              icon: 'error'
            })
          }
        })
        this.subs.add(deleteContract)
      }
    })
  }
}
