import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  links: any = [
    { name: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { name: 'Booking', icon: 'bi bi-book', path: 'booking' },
    { name: 'COA / NDA', icon: 'bi bi-envelope-paper', path: 'coa-nda' },
    { name: 'My Quotation', icon: 'bi bi-blockquote-right', path: 'my-quotation' },
    { name: 'My Customer', icon: 'bi bi-file-earmark-person', path: 'my-customer' },
    { name: 'My Inventory', icon: 'bi bi-card-checklist', path: 'my-inventory' },
  ]
  status: boolean = false;
  showToggle: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = (window.innerWidth <= 767) ? true : false
    // this.status = (window.innerWidth > 767) ? false : true
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.showToggle = (window.innerWidth <= 767) ? true : false
  }

  logout(e: any): void {
    this.router.navigateByUrl('/key-partners/login');
  }

  clickEvent() {
    this.status = !this.status
  }

}
