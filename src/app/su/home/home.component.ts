import { UserService } from './../../services/user.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public screen: any = window.innerWidth;

  private subs: Subscription = new Subscription()

  links: any = [
    { name: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { name: 'Add Users', icon: 'bi bi-people', path: 'users' },
    { name: 'Error Logs', icon: 'bi bi-file-text', path: 'logs' },
    { name: 'API Key', icon: 'bi bi-key', path: 'api-key' }
  ];
  status: boolean = window.innerWidth < 768 ? true : false;
  showToggle: boolean = false;

  constructor(
    private user: UserService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    // this.status = (window.innerWidth > 767) ? false : true
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  clickEvent() {
    this.status = !this.status;
  }

  handleToggle() {
    this.status = window.innerWidth < 768 ? true : this.status;
  }

  errorImage(evt: any) {
    evt.target.src = '/assets/images/landingpage/header/logo.png';
  }

  logout(e: any): void {
    let logout = this.user.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('ACCESS')
        window.location.href = '/su/login'
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
    this.subs.add(logout)
  }
}
