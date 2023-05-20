import { Subscription } from 'rxjs';
import { SocketService } from './../../services/socket.service';
import { UserService } from './../../services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ToastInjector, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  screen: any = window.innerWidth;

  pageTitle: string = 'Dashboard'

  links: any = [
    { name: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { name: 'Booking List', icon: 'bi bi-book', path: 'booking-list' },
    { name: 'COA / NDA', icon: 'bi bi-envelope-paper', path: 'coa-nda' },
    { name: 'SOA', icon: 'bi bi-wallet', path: 'soa' },
    {
      name: 'Inquiries',
      icon: 'bi bi-card-checklist',
      path: 'inquiry-list',
      data: '',
    },
    {
      name: 'Quotations',
      icon: 'bi bi-file-earmark-text',
      path: 'quotation-list',
    },
    {
      name: 'Purchase Order',
      icon: 'bi bi-basket2',
      path: 'purchase-order',
      data: '',
    },
    { name: 'Key Partners', icon: 'bi bi-people', path: 'key-partners' },
    { name: 'Reports', icon: 'bi bi-file-medical', path: 'report' },
    {
      name: 'Account Request',
      icon: 'bi bi-chat-left',
      path: 'acct-request',
      data: '',
    },
    { name: 'Inventory', icon: 'bi bi-card-list', path: 'inventory', data: '' },
    { name: 'Return To Sender', icon: 'bi bi-layer-backward', path: 'rts' },
    { name: 'Settings', icon: 'bi bi-gear', path: 'settings' },
  ];
  status: boolean = window.innerWidth < 821 ? true : false;
  showToggle: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private user: UserService,
    private socket: SocketService,
    private toast: ToastrService
  ) {
    let routerEvent = router.events.subscribe({
      next: (res: any) => {
        if (res instanceof NavigationEnd) {
          let field: string = '', ind: number = 0
          switch(router.url) {
            case '/admin/home/purchase-order':
              field = 'purchaseOrder'
              ind = 6
              break;
            case '/admin/home/acct-request':
              field = 'acctReq'
              ind = 9
              break;
            case '/admin/home/inquiry-list':
              field = 'inquiry'
              ind = 4
              break;
            case '/admin/home/inventory':
              field = 'adminInv'
              ind = 10
              break;
          }
          let updateNotifStatus = user.updateNotifStatus({ field }).subscribe({
            next: (res: any) => {
              this.links[ind].data = ''
            }
          })
          this.subs.add(updateNotifStatus)
          this.handleTitleChange(router.url)
        }
      },
    });
    this.subs.add(routerEvent)
  }

  handleTitleChange(url: string) {
    switch(url) {
      case '/admin/home/dashboard':
        this.pageTitle = 'Dashboard';
        break;
      case '/admin/home/booking-list':
        this.pageTitle = 'Booking List';
        break;
      case '/admin/home/coa-nda':
        this.pageTitle = 'COA/NDA';
        break;
      case '/admin/home/soa':
        this.pageTitle = 'SOA';
        break;
      case '/admin/home/inquiry-list':
        this.pageTitle = 'Inquiry List';
        break;
      case '/admin/home/quotation-list':
        this.pageTitle = 'Quotation List';
        break;
      case '/admin/home/purchase-order':
        this.pageTitle = 'Purchase Order';
        break;
      case '/admin/home/key-partners':
        this.pageTitle = 'Key Partners';
        break;
      case '/admin/home/report':
        this.pageTitle = 'Report';
        break;
      case '/admin/home/acct-request':
        this.pageTitle = 'Account Request';
        break;
      case '/admin/home/inventory':
        this.pageTitle = 'Inventory';
        break;
      case '/admin/home/rts':
        this.pageTitle = 'Return to Seller';
        break;
      case '/admin/home/settings':
        this.pageTitle = 'Settings';
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = window.innerWidth <= 821 ? true : false;
    // this.status = (window.innerWidth > 767) ? false : true
  }

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 821 ? true : false;
    // this.status = (window.innerWidth <= 767) ? false : true

    let getNotificationCounts = this.user.getNotificationCounts().subscribe({
      next: (res: any) => {
        this.links[4].data = res.info.inquiry === 0 ? '' : res.info.inquiry;
        this.links[6].data =
          res.info.purchaseOrder === 0 ? '' : res.info.purchaseOrder;
        this.links[9].data = res.info.acctReq === 0 ? '' : res.info.acctReq;
        this.links[10].data = res.info.adminInv === 0 ? '' : '!';
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });

    if (!this.socket.isConnected()) {
      let data: any = jwtDecode(localStorage.getItem('ACCESS') as string);
      this.socket.emit('join', { id: data.sub });

      // listeners

      // purchase order counter
       let newInquiry = this.socket.listen('new inquiry').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/admin/home/inquiry-list') {
            if (data.sub === res.id) {
              this.toast.info('A new inquiry arrived');
              this.links[4].data =
                this.links[4].data === ''
                  ? res.info
                  : +this.links[4].data + res.info;
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });

      // purchase order counter
      let newPurchaseOrder = this.socket.listen('new purchase order').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/admin/home/purchase-order') {
            if (data.sub === res.id) {
              this.toast.info('A new purchase order arrived');
              this.links[6].data =
                this.links[6].data === ''
                  ? res.info
                  : +this.links[6].data + res.info;
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });

      // account request counter
      let newAccountRequest = this.socket.listen('new account request').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/admin/home/acct-request') {
            if (data.sub === res.id) {
              this.toast.info('A new account requesting for approval');
              this.links[9].data =
                this.links[9].data === ''
                  ? res.info
                  : +this.links[9].data + res.info;
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });

      // inventory
      let adminInventoryWarning = this.socket.listen('admin inventory warning').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/admin/home/inventory') {
            if (data.sub === res.id) {
              this.links[10].data = '!';
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });
      this.subs.add(newInquiry)
      this.subs.add(newPurchaseOrder)
      this.subs.add(newAccountRequest)
      this.subs.add(adminInventoryWarning)
    }

    this.subs.add(getNotificationCounts)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  logout(e: any): void {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        let logout = this.user.logout().subscribe({
          next: (res) => {
            localStorage.removeItem('ACCESS');
            window.location.href = '/admin/login';
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.subs.add(logout)
      }
    });
  }

  clickEvent() {
    this.status = !this.status;
  }

  handleToggle() {
    this.status = window.innerWidth < 821 ? true : this.status;
  }
}
