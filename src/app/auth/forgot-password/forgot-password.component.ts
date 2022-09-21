import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public isSent: boolean = false;
  public email: string = '';

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  requestPasswordReset() {
    if(this.email !== '') {
      this.user.requestPasswordReset(this.email).subscribe({
        next: (_) => this.isSent = true,
        error: ({error}: any) => console.log(error)
      })
    }
  }

}
