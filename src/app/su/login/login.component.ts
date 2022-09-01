import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;

  public username: string = '';
  public password: string = '';

  constructor(
    private user: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  toggleShow() {
    this.show = !this.show;
  }

  login() {
    if (this.validateLogin()) {
      this.user.login({ username: this.username, password: this.password, access: 0 }).subscribe({
        next: (res: any) => {
          localStorage.setItem('ACCESS', res.info)
          window.location.href = '/su/home'
        },
        error: ({ error }: any) =>{
          this.toast.error('Failed to login', error.msg)
        }
      })
    }
  }

  validateLogin(): boolean {
    let message = '';

    if (this.username === '') {
      message = 'Please enter username.';
    } else if (this.password === '') {
      message = 'Please enter password.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
  }
}
