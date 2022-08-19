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

  constructor(private kp: KeyPartnerService, private md: NgbModal) {}

  ngOnInit(): void {
    this.kp.getApprovedKeyPartners().subscribe({
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
    });
    sp.componentInstance.id = id;
  }

  setCode(id: string): any {
    let i = this.keyPartners.findIndex((x: any) => x._id === id);
    if (!this.keyPartners[i].isActivated) {
      return Swal.fire(
        'Account is inactive',
        'Activate the account first and try again',
        'error'
      );
    }
    let sp: NgbModalRef = this.md.open(AssignCodeComponent, { size: 'md' });
    sp.componentInstance.id = id;
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

  assignCode(data: any) {
    let assignCode = this.md.open(AssignCodeComponent, { size: 'md' });
    assignCode.componentInstance.data = data;
  }

  deleteKP(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this Key Partner?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        console.log(id);
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
}
