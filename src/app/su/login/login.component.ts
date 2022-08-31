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

  constructor() {}

  ngOnInit(): void {}

  toggleShow() {
    this.show = !this.show;
  }

  login() {
    if (this.validateLogin()) {
      console.log(this.username, this.password);
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
