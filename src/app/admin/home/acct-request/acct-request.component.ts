import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { KeyPartnerService } from 'src/app/services/key-partner.service';

@Component({
  selector: 'app-acct-request',
  templateUrl: './acct-request.component.html',
  styleUrls: ['./acct-request.component.scss'],
})
export class AcctRequestComponent implements OnInit {
  public keyPartners: any = [];

  constructor(private kp: KeyPartnerService) {}

  ngOnInit(): void {
    this.kp.getKeyPartnerForApproval().subscribe({
      next: (res: any) => {
        res.info.forEach((x: any) => {
          this.keyPartners.push(x);
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  approveKeyPartner(id: string) {
    this.kp.approveKeyPartner(id).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.msg, 'success').then((result: any) => {
          let i = this.keyPartners.findIndex((x: any) => x._id === id);
          this.keyPartners.splice(i, 1);
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
}
