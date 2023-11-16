import { ShowKeyComponent } from './show-key/show-key.component';
import Swal from 'sweetalert2';
import { NewClientComponent } from './new-client/new-client.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiKeyService } from './../../../services/api-key.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.scss']
})
export class ApiKeyComponent implements OnInit, OnDestroy {

  public search: string = '';
  public clients: any = [];

  private subs: Subscription = new Subscription()

  constructor(
    private mdCtrl: NgbModal,
    private apikey: ApiKeyService
  ) { }

  ngOnInit(): void {
    this._getClientList()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  public handleSearch(): void {
    if(this.search !== '') {
      this._getClientList(this.search)
    }
  }

  public handleAddClient(): void {
    let addClient = this.mdCtrl.open(NewClientComponent)
    let addClientDismissed = addClient.dismissed.subscribe({
      next: () => {
        this._getClientList()
      }
    })
    this.subs.add(addClientDismissed)
  }

  public handleGenerateKey(client: any): void {
    let generateKey = this.apikey.generateAPIKey(client._id).subscribe({
      next: (res: any) => {
        console.log(res)
        let showKey = this.mdCtrl.open(ShowKeyComponent)
        showKey.componentInstance.key = res.info.key
        showKey.componentInstance.client = client.client
        showKey.dismissed.subscribe({
          next: () => {
            this._getClientList()
          }
        })
      },
      error: ({ error }) => {

      }
    })
    this.subs.add(generateKey)
  }

  public handleRemoveClient(client: any): void {
    Swal.fire({
      title: `Remove client? "${client.client}"`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((res) => {
      if(res.isConfirmed) {
        let deleteClient = this.apikey.deleteClient(client._id).subscribe({
          next: () => {
            this._getClientList()
          },
          error: ({error}) => {

          }
        })
        this.subs.add(deleteClient)
      }
    })
  }

  private _getClientList(client?: string): void {
    this.clients = []
    let getClientList = this.apikey.getClientList(client || undefined).subscribe({
      next: (res: any) => {
        this.clients = res.info
      },
      error: ({ error }) => {
        console.log(error)
      }
    })
    this.subs.add(getClientList)
  }

}
