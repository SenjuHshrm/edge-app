import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyPartnerService } from 'src/app/services/key-partner.service';

@Component({
  selector: 'app-acct-request',
  templateUrl: './acct-request.component.html',
  styleUrls: ['./acct-request.component.scss'],
})
export class AcctRequestComponent implements OnInit, OnDestroy {
  public keyPartners: any = [];
  public allData: any = [];
  public search: string = '';
  public category: string = 'email';

  private subs: Subscription = new Subscription();

  constructor(private kp: KeyPartnerService) {}

  ngOnInit(): void {
    let getKeyPartnerForApproval = this.kp.getKeyPartnerForApproval().subscribe({
      next: (res: any) => {
        res.info.forEach((x: any) => {
          this.keyPartners.push(x);
          this.allData.push(x);
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
    this.subs.add(getKeyPartnerForApproval)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  approveKeyPartner(id: string) {
    let approveKeyPartner = this.kp.approveKeyPartner(id).subscribe({
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
    this.subs.add(approveKeyPartner)
  }

  rejectAcctRequest(id: string, email: string) {
    let rejectKeyPartner = this.kp.rejectKeyPartner(id, email).subscribe({
      next: (res: any) => {
        Swal.fire('Account request rejected', 'An email has been sent to the rejected account request', 'success')
          .then(() => {
            let i = this.keyPartners.findIndex((x: any) => x._id === id)
            let j = this.allData.findIndex((x: any) => x._id === id)

            this.keyPartners.splice(i, 1)
            this.allData.splice(j, 1)
          })
      }
    })
    this.subs.add(rejectKeyPartner)
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
    this.keyPartners = data;
  }
}
