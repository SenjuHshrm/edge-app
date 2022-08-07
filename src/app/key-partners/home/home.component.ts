import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public screen: any = window.innerWidth;

  links: any = [
    { name: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { name: 'My Booking', icon: 'bi bi-book', path: 'booking' },
    {
      name: 'My COA / NDA',
      icon: 'bi bi-envelope-paper',
      path: 'my-coa-nda',
      data: '3',
    },
    { name: 'My SOA', icon: 'bi bi-wallet', path: 'my-soa', data: '10' },
    { name: 'My Inquiry', icon: 'bi bi-card-checklist', path: 'inquiry' },
    {
      name: 'My Quotation',
      icon: 'bi bi-blockquote-right',
      path: 'my-quotation',
      data: '4',
    },
    {
      name: 'My Customer',
      icon: 'bi bi-file-earmark-person',
      path: 'my-customer',
    },
    {
      name: 'My Inventory',
      icon: 'bi bi-card-list',
      path: 'my-inventory',
    },
  ];
  status: boolean = window.innerWidth < 768 ? true : false;
  showToggle: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    // this.status = (window.innerWidth > 767) ? false : true
  }

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 767 ? true : false;
  }

  logout(e: any): void {
    this.user.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('ACCESS')
        window.location.href = '/key-partners/login'
      }
    })
  }

  clickEvent() {
    this.status = !this.status;
  }

  handleToggle() {
    this.status = window.innerWidth < 768 ? true : this.status;
  }
}
