import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
      data: '',
    },
    { name: 'My SOA', icon: 'bi bi-wallet', path: 'my-soa', data: '' },
    { name: 'My Inquiry', icon: 'bi bi-card-checklist', path: 'inquiry' },
    {
      name: 'My Quotation',
      icon: 'bi bi-blockquote-right',
      path: 'my-quotation',
      data: '',
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

  constructor(private user: UserService, private kp: KeyPartnerService) {}
  // public data: any = {};
  public img: string = '';

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.img = token.img.includes('https')
      ? token.img
      : `${environment.apiV1}${token.img}`;
    // this.kp.getOneKeyPartner(token.sub).subscribe({
    //   next: (res: any) => {
    //     this.data = res.info;
    //   },
    //   error: (e: any) => console.log(e),
    // });
  }

  logout(e: any): void {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.user.logout().subscribe({
          next: (res) => {
            localStorage.removeItem('ACCESS');
            window.location.href = '/key-partners/login';
          },
        });
      }
    });
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
}
