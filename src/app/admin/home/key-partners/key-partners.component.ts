import { AssignCodeComponent } from './../../../components/modals/assign-code/assign-code.component';
import { SetKeypartnerPasswordComponent } from './../../../components/modals/set-keypartner-password/set-keypartner-password.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import Swal from 'sweetalert2';
import { UpdateKeypartnerComponent } from 'src/app/components/modals/update-keypartner/update-keypartner.component';

@Component({
  selector: 'app-key-partners',
  templateUrl: './key-partners.component.html',
  styleUrls: ['./key-partners.component.scss'],
})
export class KeyPartnersComponent implements OnInit {
  keyPartners: any = [];
  public allData: any = [];
  public search: string = '';
  public category: string = 'email';

  constructor(private kp: KeyPartnerService, private md: NgbModal) {}

  ngOnInit(): void {
    this.kp.getApprovedKeyPartners().subscribe({
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
  }

  setPassword(id: string): any {
    // let sp: NgbModalRef = this.md.open(SetKeypartnerPasswordComponent, { size: 'md', backdrop: 'static', keyboard: false })
    let i = this.keyPartners.findIndex((x: any) => x._id === id);
    if (!this.keyPartners[i].isActivated) {
      return Swal.fire(
        'Account is inactive',
        'Activate the account first and try again',
        'error'
      );
    }
    let sp: NgbModalRef = this.md.open(SetKeypartnerPasswordComponent, {
      size: 'md',
      backdrop: 'static',
    });
    sp.componentInstance.id = id;
  }

  assignCode(data: any): any {
    let i = this.keyPartners.findIndex((x: any) => x._id === data._id);
    if (!this.keyPartners[i].isActivated) {
      return Swal.fire(
        'Account is inactive',
        'Activate the account first and try again',
        'error'
      );
    }
    let sp: NgbModalRef = this.md.open(AssignCodeComponent, {
      size: 'md',
      backdrop: 'static',
    });
    sp.componentInstance.data = data;
    sp.result
      .then((res) => {
        if (res.success) {
          const ind = this.keyPartners.findIndex(
            (e: any) => e._id === res.data._id
          );
          this.keyPartners[ind].userId = res.data.userId;
        }
      })
      .catch(() => console.log());
  }

  setActiveStatus(id: string, isActivated: boolean) {
    this.kp.setStatus(isActivated, id).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.msg, 'success').then((result: any) => {
          let i = this.keyPartners.findIndex((x: any) => x._id === id);
          this.keyPartners[i].isActivated = !isActivated;
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  // assignCode(data: any) {
  //   let assignCode = this.md.open(AssignCodeComponent, { size: 'md' });
  //   assignCode.componentInstance.data = data;
  // }

  deleteKP(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this Key Partner?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.kp.deleteKeypartner(id).subscribe({
          next: (res: any) => {
            if (res.success) {
              const datas = this.keyPartners.filter(
                (e: any) => e._id !== res.info
              );
              this.keyPartners = datas;
              Swal.fire('Deleted Successfully.', '', 'success');
            } else {
              Swal.fire('Failed to delete the record.', '', 'error');
            }
          },
          error: ({ error }) => {
            Swal.fire('Failed to delete the record.', '', 'error');
          },
        });
      } else {
        Swal.fire({
          title: 'Delete cancelled.',
          icon: 'info',
        });
      }
    });
  }

  updateKP(id: string) {
    let updateKP = this.md.open(UpdateKeypartnerComponent, { size: 'md' });
    updateKP.componentInstance.id = id;
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
