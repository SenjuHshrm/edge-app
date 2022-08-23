import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private kp: KeyPartnerService, private user: UserService) {}

  // password
  public currentPass: string = '';
  public newPass: string = '';
  public confirmPass: string = '';

  //profile
  public fullname: string = '';
  public address: string = '';
  public contact: string = '';
  public email: string = '';
  public company: string = '';
  public image: string = '';

  ngOnInit(): void {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.kp.getOneKeyPartner(token.sub).subscribe({
      next: (res: any) => {
        this.fullname = res.info.name;
        this.address = res.info.addr;
        this.contact = res.info.contact;
        this.email = res.info.email;
        this.company = res.info.company;
        this.image = res.info.img;
      },
      error: (e: any) => console.log(e),
    });
  }

  errorImage(evt: any) {
    evt.target.src = '/assets/images/landingpage/header/logo.png';
  }

  validatePassword(): boolean {
    let message = '';
    if (this.currentPass === '') {
      message = 'Please enter current password.';
    } else if (this.newPass === '') {
      message = 'Please enter new password.';
    } else if (this.currentPass === this.newPass) {
      message = 'New password must not match the current password.';
    } else if (this.confirmPass === '') {
      message = 'Please enter confirm new password.';
    } else if (this.newPass !== this.confirmPass) {
      message = 'New password and confirm must match.';
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

  changePassword() {
    if (this.validatePassword()) {
      const token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
      this.user
        .changePassword({
          oldPass: this.currentPass,
          newPass: this.newPass,
          id: token.sub,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                title: res.msg,
                icon: 'success',
              });
              this.currentPass = '';
              this.newPass = '';
              this.confirmPass = '';
            } else {
              Swal.fire({
                title: res.msg,
                icon: 'error',
              });
            }
          },
          error: (err) => console.log(err),
        });
    }
  }

  validateProfile(): boolean {
    let message = '';
    if (this.fullname === '') {
      message = 'Please enter fullname.';
    } else if (this.address === '') {
      message = 'Please enter address.';
    } else if (this.contact === '') {
      message = 'Please enter contact.';
    } else if (this.email === '') {
      message = 'Please enter email.';
    } else if (this.company === '') {
      message = 'Please enter company';
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

  updateProfile() {
    if (this.validateProfile()) {
      this.user
        .updateProfile({
          name: this.fullname,
          company: this.company,
          addr: this.address,
          contact: this.contact,
          email: this.email,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                title: 'Profile successfully updated!',
                icon: 'success',
              });
            }
          },
          error: (e) => console.log(e),
        });
    }
  }
}
