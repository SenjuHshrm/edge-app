import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  links: any = [
    { name: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { name: 'Booking List', icon: 'bi bi-book', path: 'booking-list' },
    { name: 'Key Partners', icon: 'bi bi-people', path: 'key-partners' },
    { name: 'Report', icon: 'bi bi-file-medical', path: 'report' },
    { name: 'Account Request', icon: 'bi bi-chat-left', path: 'acct-request' },
    { name: 'Inventory', icon: 'bi bi-card-checklist', path: 'inventory' },
    { name: 'Settings', icon: 'bi bi-gear', path: 'settings' },
  ];
  status: boolean = false;
  showToggle: boolean = false;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = (window.innerWidth <= 767) ? true : false
    // this.status = (window.innerWidth > 767) ? false : true
  }

  ngOnInit(): void {
    this.showToggle = (window.innerWidth <= 767) ? true : false
    // this.status = (window.innerWidth <= 767) ? false : true
  }

  logout(e: any): void {
    this.router.navigateByUrl('/admin/login');
  }

  clickEvent() {
    this.status = !this.status
  }
}
