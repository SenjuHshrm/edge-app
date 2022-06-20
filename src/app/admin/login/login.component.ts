import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public cred: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {}

  login(e: any, data: any): void {
    e.preventDefault()
    if(data.valid) {
      this.isLoading = !this.isLoading
      this.user.login({...data.value, access: 'admin'}).subscribe({
        next: (res: any) => {
          this.isLoading = !this.isLoading
          localStorage.setItem('ACCESS', res.info)
          window.location.href = '/admin/home'
        },
        error: ({ error }: any) => {
          this.isLoading = !this.isLoading
          console.log(error)
        }
      })
    }
    // this.router.navigateByUrl('/admin/home')
  }

}
