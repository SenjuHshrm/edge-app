import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-keypartner-password',
  templateUrl: './set-keypartner-password.component.html',
  styleUrls: ['./set-keypartner-password.component.scss']
})
export class SetKeypartnerPasswordComponent implements OnInit {

  @Input() public id: string = ''
  public characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*_+<>?abcdefghijklmnopqrstuvwxyz0123456789'
  public password: string = ''

  constructor(private md: NgbModal, private kp: KeyPartnerService) { }

  ngOnInit(): void {
    console.log(this.id)
  }

  randomPassword(ln: number) {
    const chLn = this.characters.length
    let res = ''
    for(let i = 0; i < ln; i++) {
      res += this.characters.charAt(Math.floor(Math.random() * chLn))
    }
    this.password = res
  }

  setPassword() {
    this.kp.setKeyPartnerPassword(this.id, this.password).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.msg, 'success')
          .then((_) => {
            this.md.dismissAll()
          })
      },
      error: (e: any) => {
        console.log(e)
      }
    })
  }

}
