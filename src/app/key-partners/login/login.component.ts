import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public cred: FormGroup = new FormGroup({
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
      error: (e) => {
        console.log(e)
      }
    })

  }
}
