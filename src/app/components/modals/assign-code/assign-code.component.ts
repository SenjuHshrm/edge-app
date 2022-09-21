import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assign-code',
  templateUrl: './assign-code.component.html',
  styleUrls: ['./assign-code.component.scss']
})
export class AssignCodeComponent implements OnInit {
  @Input() public data: any;
  public userId: string = '';

  public characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*_+<>?abcdefghijklmnopqrstuvwxyz0123456789';
  public password: string = '';
  public password2: string = '';

  public loading: boolean = false;

  constructor(private kp: KeyPartnerService, private md: NgbActiveModal) {}

  ngOnInit(): void {}

  setUserId() {
    this.kp.setUserId(this.data._id, { userId: this.userId }).subscribe({
      next: (res: any) => {
        Swal.fire('Success', 'User id assigned', 'success').then(() => {
          this.md.close();
        });
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
  }

  randomPassword(ln: number, pass: string) {
    const chLn = this.characters.length;
    let res = '';
    for (let i = 0; i < ln; i++) {
      res += this.characters.charAt(Math.floor(Math.random() * chLn));
    }
    if (pass === 'pass1') {
      this.password = res;
    } else {
      this.password2 = res;
    }
  }

  setPassword() {
    if (this.validateCP()) {
      this.loading = true;
      this.kp
        .assignCodeAndPassword(this.data._id, {
          userId: this.userId.toUpperCase(),
          password: this.password,
          secondPassword: this.password2
        })
        .subscribe({
          next: (res: any) => {
            Swal.fire('Success', res.msg, 'success').then((_) => {
              this.md.close({ success: true, data: res.info });
            });
            this.loading = false;
          },
          error: (e: any) => {
            console.log(e);
            this.loading = false;
          },
        });
    }
  }

  validateCP(): boolean {
    let message = '';

    if (this.userId === '') {
      message = 'Please enter code.';
    } else if (this.userId.length < 6) {
      message = 'Code must be atleast 6 letters.';
    } else if (this.password === '') {
      message = 'Please generate a password for key partner';
    } else if (this.password2 === '') {
      message = 'Please generate a password';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire({
        title: message,
        icon: 'info',
      });
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
        this.md.close();
      }
    });
  };
}
