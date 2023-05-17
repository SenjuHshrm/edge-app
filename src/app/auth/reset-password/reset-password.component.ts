import jwtDecode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

export interface PasswordForm {
  password: AbstractControl<string | null>;
  authpass: AbstractControl<string | null>;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public passwordForm: FormGroup<PasswordForm> = new FormGroup<PasswordForm>({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    authpass: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  public tokenStat: string = 'verify'

  private subs: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    let token: string = this.route.snapshot.params['token']
    let checkPasswordResetToken = this.user.checkPasswordResetToken(token).subscribe({
      next: (_) => this.tokenStat = 'verify-success',
      error: ({error}: any) => this.tokenStat = 'verify-error'
    })
    this.subs.add(checkPasswordResetToken)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  resetPassword(e: SubmitEvent, data: FormGroup<PasswordForm>) {
    e.preventDefault()
    if(data.valid) {
      this.tokenStat = 'verify'
      let token: any = jwtDecode(this.route.snapshot.params['token'])
      let resetPassword = this.user.resetPassword({ id: token.sub, password: data.controls.password.value }).subscribe({
        next: (_) => this.tokenStat = 'reset-success',
        error: ({error}: any) => this.tokenStat = 'reset-error'
      })
      this.subs.add(resetPassword)
    } else {
      this.validatePassword(data.controls.password.errors, data.controls.authpass.errors)
    }
  }

  validatePassword(password: any, authpass: any) {
    if(password?.required) {
      this.toast.error('', 'Password is required')
    } else if(password?.minlength) {
      this.toast.error('', 'Minimum of 6 characters in password')
    } else if(authpass?.required) {
      this.toast.error('', 'Confirm Password is required')
    } else if(authpass?.minlength) {
      this.toast.error('', 'Minimum of 6 characters in confirm password')
    }
  }

}
