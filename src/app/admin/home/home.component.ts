import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  screen: any = window.innerWidth;

  links: any = [
    { name: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { name: 'Booking List', icon: 'bi bi-book', path: 'booking-list' },
    { name: 'Inquiries', icon: 'bi bi-card-checklist', path: 'inquiry-list' },
    {
      name: 'Quotations',
      icon: 'bi bi-file-earmark-text',
      path: 'quotation-list',
    },
    {
      name: 'Purchase Order',
      icon: 'bi bi-basket2',
      path: 'purchase-order',
    },
    { name: 'Key Partners', icon: 'bi bi-people', path: 'key-partners' },
    { name: 'Report', icon: 'bi bi-file-medical', path: 'report' },
    { name: 'Account Request', icon: 'bi bi-chat-left', path: 'acct-request' },
    { name: 'Inventory', icon: 'bi bi-card-checklist', path: 'inventory' },
    { name: 'Settings', icon: 'bi bi-gear', path: 'settings' },
  ];
  status: boolean = window.innerWidth < 768 ? true : false;
  showToggle: boolean = false;

  constructor(private router: Router, private user: UserService) {}

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    // this.status = (window.innerWidth > 767) ? false : true
  }

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    // this.status = (window.innerWidth <= 767) ? false : true
  }

  logout(e: any): void {
    this.user.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('ACCESS');
        this.router.navigateByUrl('/admin/login');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clickEvent() {
    this.status = !this.status;
  }

  handleToggle() {
    this.status = window.innerWidth < 768 ? true : this.status;
  }
}
