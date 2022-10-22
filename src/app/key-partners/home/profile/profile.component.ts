import { Component, OnInit, ɵ_sanitizeUrl } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

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

  //
  public currentIPAPass: string = '';
  public newIPAPass: string = '';
  public confirmIPAPass: string = '';

  //profile
  public fullname: string = '';
  public address: string = '';
  public contact: string = '';
  public email: string = '';
  public company: string = '';
  public image: string = '';
  public dp: string = '';

  public format: string = '';
  public base64: string = '';
  public filename: string = '';
  public file: any;
  public progress: number = 0;
  public loading: boolean = false;
  public username: string = '';

  ngOnInit(): void {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.kp.getOneKeyPartner(token.sub).subscribe({
      next: (res: any) => {
        this.fullname = res.info.name;
        this.address = res.info.addr;
        this.contact = res.info.contact;
        this.email = res.info.email;
        this.company = res.info.company;
        this.image = res.info.img.includes('https')
          ? res.info.img
          : `${environment.apiV1}${res.info.img}`;
      },
      error: (e: any) => console.log(e),
    });
  }

  validatePassword(currPass: string, newPass: string, authPass: string): boolean {
    let message = '';
    if (currPass === '') {
      message = 'Please enter current password.';
    } else if (newPass === '') {
      message = 'Please enter new password.';
    } else if (currPass === newPass) {
      message = 'New password must not match the current password.';
    } else if (authPass === '') {
      message = 'Please enter confirm new password.';
    } else if (newPass !== authPass) {
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
    if (this.validatePassword(this.currentPass, this.newPass, this.confirmPass)) {
      this.loading = true;
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
              this.loading = false;
            } else {
              Swal.fire({
                title: res.msg,
                icon: 'error',
              });
              this.loading = false;
            }
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });
    }
  }

  changeIPAPassword() {
    if (this.validatePassword(this.currentIPAPass, this.newIPAPass, this.confirmIPAPass)) {
      this.loading = true;
      const token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
      this.user
        .changeIPAPassword({
          oldPass: this.currentIPAPass,
          newPass: this.newIPAPass,
          id: token.sub,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                title: res.msg,
                icon: 'success',
              });
              this.currentIPAPass = '';
              this.newIPAPass = '';
              this.confirmIPAPass = '';
              this.loading = false;
            } else {
              Swal.fire({
                title: res.msg,
                icon: 'error',
              });
              this.loading = false;
            }
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
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

  selectImage() {
    (<HTMLButtonElement>document.getElementById('profile-change')).click();
  }

  handleImage(evt: any) {
    const types = ['jpg', 'png', 'gif', 'jpeg', 'svg'];
    const name = evt.target.files[0].name;

    if (evt.target.files.length > 0) {
      if (types.includes(name.substring(name.lastIndexOf('.') + 1))) {
        this.filename = evt.target.files[0].name;
        this.file = evt.target.files[0];
        const reader: any = new FileReader();
        reader.onload = (e: any) => {
          this.dp = reader.result;
          this.format = evt.target.files[0].name.substring(
            evt.target.files[0].name.lastIndexOf('.'),
            evt.target.files[0].name.length
          );
          this.base64 = reader.result;
        };
        reader.readAsDataURL(evt.target.files[0]);
      } else {
        Swal.fire({
          title: 'Please select a valid image.',
          icon: 'info',
        });
        (<HTMLInputElement>document.getElementById('profile-change')).value =
          '';
      }
    }
  }

  saveProfileImage() {
    if (this.filename) {
      this.loading = true;
      let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);

      let filename = `${token.sub}${this.filename.substring(
        this.filename.lastIndexOf('.'),
        this.filename.length
      )}`;

      let dpData = new FormData();
      dpData.append('filename', filename);
      dpData.append('image', this.file);
      dpData.append('keyPartnerId', token.sub);

      this.user.updateProfileImage(dpData).subscribe((evt: HttpEvent<any>) => {
        switch (evt.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round((evt.loaded / Number(evt.total)) * 100);
            break;

          case HttpEventType.Response:
            this.progress = 0;
            Swal.fire({
              title:
                'Profile Picture has been updated!',
              icon: 'success',
            }).then(() => {
              localStorage.setItem('ACCESS', evt.body.info)
              window.location.href = '/key-partners/home/profile'
              this.loading = false;
            });
        }
      });
    } else {
      Swal.fire({
        title: 'Please select an image.',
        icon: 'info',
      });
    }
  }

  updateUsername() {
    if(this.username !== '') {
      this.user.updateUsername({ username: this.username }).subscribe({
        next: (res: any) => {
          Swal.fire({ title: 'Username updated', icon: 'success' })
        },
        error: ({ error }: any) => {
          Swal.fire({ title: error.msg, icon: 'error' })
        }
      })
    } else {
      Swal.fire({
        title: 'Please input your new username',
        icon: 'warning'
      })
    }
  }
}
