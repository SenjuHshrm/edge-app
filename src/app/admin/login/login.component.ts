import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/interfaces/login';
// import { Toast } from '@ng-bootstrap'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public cred: FormGroup<Login> = new FormGroup<Login>({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private user: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  login(e: any, data: any): void {
    e.preventDefault();
    if (data.valid) {
      this.isLoading = !this.isLoading;
      this.user.login({ ...data.value, access: 1 }).subscribe({
        next: (res: any) => {
          this.isLoading = !this.isLoading;
          localStorage.setItem('ACCESS', res.info);
          window.location.href = '/admin/home';
        },
        error: ({ error }: any) => {
          this.isLoading = !this.isLoading;
          this.toast.error('Failed to login.', error.msg);
        },
      });
    } else {
      console.log(data.controls);
      this.validateError(
        data.controls.username.errors,
        data.controls.password.errors
      );
    }
  }

  validateError(uname: any, pass: any) {
    if (uname?.required) {
      this.toast.error('Failed to login.', 'Username is required!.');
    } else if (uname?.minlength) {
      this.toast.error(
        'Failed to login.',
        'Minimum of 6 characters in username.'
      );
    } else if (pass?.required) {
      this.toast.error('Failed to login.', 'Password is required!.');
    } else if (pass?.minlength) {
      this.toast.error(
        'Failed to login.',
        'Minimum of 6 characters in password.'
      );
    }
  }
}
