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
    { name: 'COA / NDA', icon: 'bi bi-envelope-paper', path: 'coa-nda' },
    { name: 'SOA', icon: 'bi bi-wallet', path: 'soa' },
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
      data: '3',
    },
    { name: 'Key Partners', icon: 'bi bi-people', path: 'key-partners' },
    { name: 'Reports', icon: 'bi bi-file-medical', path: 'report' },
    {
      name: 'Account Request',
      icon: 'bi bi-chat-left',
      path: 'acct-request',
      data: '10',
    },
    {
      name: 'Inventory',
      icon: 'bi bi-card-list',
      path: 'inventory',
      data: '10',
    },
    {
      name: 'Return To Sender',
      icon: 'bi bi-layer-backward',
      path: 'rts',
    },
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
        localStorage.removeItem('ACCESS')
        window.location.href = '/admin/login'
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
