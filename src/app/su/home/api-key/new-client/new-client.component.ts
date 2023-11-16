import Swal, { SweetAlertIcon } from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiKeyService } from './../../../../services/api-key.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit, OnDestroy {

  public client: string = ''
  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(
    private mdRef: NgbModal,
    private apikey: ApiKeyService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  public handleAddClient(): void {
    if(this.client !== '') {
      this.loading = true
      let addClient = this.apikey.addClient({ client: this.client.toLocaleLowerCase() }).subscribe({
        next: (res: any) => {
          this._showResult(res)
        },
        error: ({ error }) => {
          this._showResult(error)
        }
      })
      this.subs.add(addClient)
    }
  }

  public handleClose(): void {
    this.mdRef.dismissAll()
  }

  private _showResult(res: any): void {
    let title: string = (res.success) ? 'Success' : 'Error'
    let type: SweetAlertIcon = (res.success) ? 'success' : 'error'
    let msg: string = (res.success) ? `Client added: "${res.info.client}"` : res.msg
    Swal.fire(title, msg, type).then(() => {
      this.loading = false
      if(res.success) return this.mdRef.dismissAll()
    })
  }

}
