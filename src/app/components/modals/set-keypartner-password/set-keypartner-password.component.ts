import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-set-keypartner-password',
  templateUrl: './set-keypartner-password.component.html',
  styleUrls: ['./set-keypartner-password.component.scss'],
})
export class SetKeypartnerPasswordComponent implements OnInit, OnDestroy {
  @Input() public id: string = '';
  public characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*_+<>?abcdefghijklmnopqrstuvwxyz0123456789';
  public password: string = '';
  public password2: string = '';

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(private md: NgbModal, private kp: KeyPartnerService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  randomPassword(ln: number, pass: string) {
    const chLn = this.characters.length;
    let res = '';
    for (let i = 0; i < ln; i++) {
      res += this.characters.charAt(Math.floor(Math.random() * chLn));
    }
    if (pass === 'pass1') this.password = res;
    if (pass === 'pass2') this.password2 = res;
  }

  setPassword() {
    if (this.validatePassword()) {
      this.loading = true;
      let setKeyPartnerPassword = this.kp
        .setKeyPartnerPassword(this.id, {
          password: this.password,
          secondPassword: this.password2,
        })
        .subscribe({
          next: (res: any) => {
            Swal.fire('Success', res.msg, 'success').then((_) => {
              this.md.dismissAll();
            });
            this.loading = false;
          },
          error: (e: any) => {
            this.loading = false;
          },
        });
      this.subs.add(setKeyPartnerPassword)
    }
  }

  validatePassword(): boolean {
    let message = '';

    if (this.password === '') {
      message = 'Please generate password for password.';
    } else if (this.password2 === '') {
      message = 'Please generate password for second password.';
    } else if (this.password === this.password2) {
      message = 'Both password must not be the same.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
  }

  copyPassword() {
    if (this.password === '') {
      Swal.fire({
        title: 'Please generate a random password.',
        icon: 'info',
      });
    } else {
      Swal.fire({
        title: 'Password copied!',
        icon: 'success',
      });
      navigator.clipboard.writeText(this.password);
    }
  }

  handleClose = () => {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.md.dismissAll();
      }
    });
  };
}
