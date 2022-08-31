import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public data: any = {
    email: '',
    username: '',
    password: '',
    confirm: '',
    name: '',
    contact: '',
    company: '',
    accessLvl: '',
    approval: '',
  };

  constructor() {}

  ngOnInit(): void {}

  validateData(): boolean {
    let message = '';

    if (this.data.email === '') {
      message = 'Please enter email.';
    } else if (this.data.username === '') {
      message = 'Please enter username';
    } else if (this.data.password === '') {
      message = 'Please enter password';
    } else if (this.data.confirm === '') {
      message = 'Please confirm your password.';
    } else if (this.data.password !== this.data.confirm) {
      message = 'Password and confirm password must match.';
    } else if (this.data.name === '') {
      message = 'Please enter full name.';
    } else if (this.data.contact === '') {
      message = 'Please enter contact.';
    } else if (this.data.company === '') {
      message = 'Please enter company.';
    } else if (this.data.accessLvl === '') {
      message = 'Please select user access level.';
    } else if (this.data.approval === '') {
      message = 'Please select approval status.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
  }

  saveUser() {
    if (this.validateData()) {
      console.log(this.data);
    }
  }
}
