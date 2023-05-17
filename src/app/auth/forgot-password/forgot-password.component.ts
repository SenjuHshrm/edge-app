import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public isSent: boolean = false;
  public email: string = '';

  private subs: Subscription = new Subscription()

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  requestPasswordReset() {
    if(this.email !== '') {
      let requestPasswordReset = this.user.requestPasswordReset(this.email).subscribe({
        next: (_) => this.isSent = true,
        error: ({error}: any) => console.log(error)
      })
      this.subs.add(requestPasswordReset)
    }
  }

}
