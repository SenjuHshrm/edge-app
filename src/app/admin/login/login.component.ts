import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(
  ): void {
  }

  login(e: any): void {
    e.preventDefault()
    console.log('clicked')
    this.router.navigateByUrl('/admin/home')
  }

}
