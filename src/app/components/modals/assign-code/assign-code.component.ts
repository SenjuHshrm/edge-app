import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assign-code',
  templateUrl: './assign-code.component.html',
  styleUrls: ['./assign-code.component.scss'],
})
export class AssignCodeComponent implements OnInit {
  @Input() public data: any;
  public userId: string = '';

  constructor(
    private kp: KeyPartnerService,
    private md: NgbModal
  ) {}

  ngOnInit(): void {}

  setUserId() {
    this.kp.setUserId(this.data._id, { userId: this.userId }).subscribe({
      next: (res: any) => {
        Swal.fire('Success', 'User id assigned', 'success')
          .then(() => {
            this.md.dismissAll()
          })
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }
}
