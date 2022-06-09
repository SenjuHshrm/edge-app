import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout(e: any): void {
    this.router.navigateByUrl('/admin/login');
  }
}
