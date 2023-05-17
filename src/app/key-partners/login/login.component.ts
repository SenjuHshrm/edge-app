import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from 'src/app/interfaces/login';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
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

  public loading: boolean = false
  
  private subs: Subscription = new Subscription()

  constructor(private user: UserService, private toast: ToastrService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  login(e: any, data: any): void {
    e.preventDefault();
    if (data.valid) {
      this.loading = true;
      let login = this.user.login({ ...data.value, access: [3] }).subscribe({
        next: (res) => {
          this.loading = false;
          localStorage.setItem('ACCESS', res.info);
          window.location.href = '/key-partners/home';
        },
        error: ({ error }: any) => {
          this.loading = false;
          this.toast.error('Failed to login.', error.msg);
        },
      });
      this.subs.add(login)
    } else {
      this.loading = false;
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
