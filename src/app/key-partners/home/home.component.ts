import { ToastrService } from 'ngx-toastr';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
      data: '',
    },
  ];
  status: boolean = window.innerWidth < 821 ? true : false;
  showToggle: boolean = false;
  pageTitle: string = ''

  private subs: Subscription = new Subscription()

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.showToggle = window.innerWidth <= 821 ? true : false;
    // this.status = (window.innerWidth > 767) ? false : true
  }

  constructor(
    private user: UserService,
    private kp: KeyPartnerService,
    private socket: SocketService,
    private router: Router,
    private toast: ToastrService
  ) {
    let routerEvents = router.events.subscribe({
      next: (res: any) => {
        if (res instanceof NavigationEnd) {
          let field: string = '', ind: number = 0;
          switch(router.url) {
            case '/key-partners/home/my-coa-nda':
              field = 'coanda'
              ind = 2
              break;
            case '/key-partners/home/my-soa':
              field = 'soa'
              ind = 3
              break;
            case '/key-partners/home/my-quotation':
              field = 'quotation'
              ind = 5
              break;
            case '/key-partners/home/my-inventory':
              field = 'kpInv'
              ind = 7
              break;
          }
          let updateNotifStatus = user.updateNotifStatus({ field }).subscribe({
            next: (res: any) => {
              this.links[ind].data = '';
            },
          });
          this.subs.add(updateNotifStatus)
          this.handleTitleChange(router.url)
        }
      },
    });
    this.subs.add(routerEvents)
  }

  handleTitleChange(url: string) {
    switch(url) {
      case '/key-partners/home/dashboard':
        this.pageTitle = 'Dashboard';
        break;
      case '/key-partners/home/booking':
        this.pageTitle = 'Booking';
        break;
      case '/key-partners/home/my-coa-nda':
        this.pageTitle = 'COA/NDA';
        break;
      case '/key-partners/home/my-soa':
        this.pageTitle = 'SOA';
        break;
      case '/key-partners/home/inquiry':
        this.pageTitle = 'Inquiry';
        break;
      case '/key-partners/home/my-quotation':
        this.pageTitle = 'Quotation';
        break;
      case '/key-partners/home/my-customer':
        this.pageTitle = 'My Customer';
        break;
      case '/key-partners/home/my-inventory':
        this.pageTitle = 'Inventory';
        break;
      case '/key-partners/home/profile':
        this.pageTitle = 'Profile';
        break;
    }
  }

  // public data: any = {};
  public img: string = '';

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 820 ? true : false;
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.img = token.img?.includes('https')
      ? token.img
      : `${environment.apiV1}${token.img}`;

    let getNotificationCounts = this.user.getNotificationCounts().subscribe({
      next: (res: any) => {
        this.links[2].data = res.info.coanda === 0 ? '' : res.info.coanda;
        this.links[3].data = res.info.soa === 0 ? '' : res.info.soa;
        this.links[5].data = res.info.quotation === 0 ? '' : res.info.quotation;
        this.links[7].data = res.info.kpInv === 0 ? '' : '!';
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });

    this.subs.add(getNotificationCounts)

    if (!this.socket.isConnected()) {
      let data: any = jwtDecode(localStorage.getItem('ACCESS') as string);
      this.socket.emit('join', { id: data.sub });

      // listeners

      // coa-nda
      let newCoaNda = this.socket.listen('new coa-nda').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/key-partners/home/my-coa-nda') {
            if (data.sub === res.id) {
              this.toast.info('Edge admin sent you a file (COA/NDA)');
              this.links[2].data =
                this.links[2].data === ''
                  ? res.info
                  : +this.links[2].data + res.info;
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });

      // soa
      let newSoa = this.socket.listen('new soa').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/key-partners/home/my-soa') {
            if (data.sub === res.id) {
              this.toast.info('Edge Admin sent you a file (SOA)');
              this.links[3].data =
                this.links[3].data === ''
                  ? res.info
                  : +this.links[3].data + res.info;
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });

      // quotation
      let newQuotation = this.socket.listen('new quotation').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/key-partners/home/my-quotation') {
            if (data.sub === res.id) {
              this.toast.info('Edge Admin sent a quotation to your inquiry');
              this.links[5].data =
                this.links[5].data === ''
                  ? res.info
                  : +this.links[5].data + res.info;
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });

      // inventory
      let keyPartnerInvWarn = this.socket.listen('keypartner inventory warning').subscribe({
        next: (res: any) => {
          if (this.router.url !== '/key-partners/home/my-inventory') {
            if (data.sub === res.id) {
              this.links[7].data = '!';
            }
          }
        },
        error: ({ error }: any) => {
          console.log(error);
        },
      });
      this.subs.add(newCoaNda)
      this.subs.add(newSoa)
      this.subs.add(newQuotation)
      this.subs.add(keyPartnerInvWarn)
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
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
        let logout = this.user.logout().subscribe({
          next: (res) => {
            localStorage.removeItem('ACCESS');
            window.location.href = '/key-partners/login';
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

  errorImage(evt: any) {
    evt.target.src = '/assets/images/landingpage/header/logo.png';
  }
}
