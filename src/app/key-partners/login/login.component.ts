import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from 'src/app/interfaces/login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public cred: FormGroup<Login> = new FormGroup<Login>({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private user: UserService) {}

  ngOnInit(): void {}

  login(e: any, data: any): void {
    e.preventDefault()
    this.user.login({ ...data.value, access: 3 }).subscribe({
      next: (res) => {
        localStorage.setItem('ACCESS', res.info)
        window.location.href = '/key-partners/home'
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })

  }
}
