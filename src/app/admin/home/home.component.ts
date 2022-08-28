import { SocketService } from './../../services/socket.service';
import { UserService } from './../../services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

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
    { name: 'Quotations', icon: 'bi bi-file-earmark-text', path: 'quotation-list', },
    { name: 'Purchase Order', icon: 'bi bi-basket2', path: 'purchase-order', data: '' },
    { name: 'Key Partners', icon: 'bi bi-people', path: 'key-partners' },
    { name: 'Reports', icon: 'bi bi-file-medical', path: 'report' },
    { name: 'Account Request', icon: 'bi bi-chat-left', path: 'acct-request', data: '' },
    { name: 'Inventory', icon: 'bi bi-card-list', path: 'inventory', data: '' },
    { name: 'Return To Sender', icon: 'bi bi-layer-backward', path: 'rts' },
    { name: 'Settings', icon: 'bi bi-gear', path: 'settings' },
  ];
  status: boolean = window.innerWidth < 768 ? true : false;
  showToggle: boolean = false;

  constructor(
    private router: Router,
    private user: UserService,
    private socket: SocketService,
    private toast: ToastrService
  ) {
    router.events.subscribe({
      next: (res: any) => {
        if(res instanceof NavigationEnd) {
          if(router.url === '/admin/home/purchase-order') {
            user.updateNotifStatus({ field: 'purchaseOrder' }).subscribe({
              next: (res: any) => {this.links[6].data = ''}
            })
          } else if(router.url === '/admin/home/acct-request') {
            user.updateNotifStatus({ field: 'acctReq' }).subscribe({
              next: (res: any) => {this.links[9].data = ''}
            })
          }
        }
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    // this.status = (window.innerWidth > 767) ? false : true
  }

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 767 ? true : false;
    // this.status = (window.innerWidth <= 767) ? false : true

    this.user.getNotificationCounts().subscribe({
      next: (res: any) => {
        console.log(res)
        this.links[6].data = (res.info.purchaseOrder.count === 0 && res.info.purchaseOrder.isOpened) ? '' : res.info.purchaseOrder.count;
        this.links[9].data = (res.info.acctReq.count === 0 && res.info.acctReq.isOpened) ? '' : res.info.acctReq.count;
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })

    if(!this.socket.isConnected()) {
      
      let data: any = jwtDecode(localStorage.getItem('ACCESS') as string)
      this.socket.emit('join', { id: data.sub })

      // listeners

      // purchase order counter
      this.socket.listen('new purchase order').subscribe({
        next: (res: any) => {
          if(this.router.url !== '/admin/home/purchase-order') {
            this.toast.info('A new purchase order arrived')
            this.links[6].data = (this.links[6].data === '') ? res.info : +this.links[6].data + res.info
          }
        },
        error: ({ error }: any) => {
          console.log(error)
        }
      })

      // account request counter
      this.socket.listen('new account request').subscribe({
        next: (res: any) => {
          if(this.router.url !== '/admin/home/acct-request') {
            this.toast.info('A new account requesting for approval')
            this.links[9].data = (this.links[9].data === '') ? res.info : +this.links[9].data + res.info
          }
        },
        error: ({ error }: any) => {
          console.log(error)
        }
      })

    }
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
