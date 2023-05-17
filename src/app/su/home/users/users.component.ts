import { UserService } from './../../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public data: any = {
    email: '',
    username: '',
    password: '',
    confirm: '',
    name: '',
    contact: '',
    company: 'EdgeCommerce',
    accessLvl: '',
  };

  private subs: Subscription = new Subscription()

  constructor(
    private user: UserService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

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
      let registerKeyPartner = this.user.registerKeyPartner(this.data).subscribe({
        next: (res: any) => {
          Swal.fire('EdgeCommerce admin registered', '', 'success')
        },
        error: ({ error }: any) => {
          console.log(error)
        }
      })
      this.subs.add(registerKeyPartner)
    }
  }
}
