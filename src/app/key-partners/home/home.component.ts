import { ToastrService } from 'ngx-toastr';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
      data: '',
    },
  ];
  status: boolean = window.innerWidth < 821 ? true : false;
  showToggle: boolean = false;

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
    router.events.subscribe({
      next: (res: any) => {
        if (res instanceof NavigationEnd) {
          if (router.url === '/key-partners/home/my-coa-nda') {
            user.updateNotifStatus({ field: 'coanda' }).subscribe({
              next: (res: any) => {
                this.links[2].data = '';
              },
            });
          } else if (router.url === '/key-partners/home/my-soa') {
            user.updateNotifStatus({ field: 'soa' }).subscribe({
              next: (res: any) => {
                this.links[3].data = '';
              },
            });
          } else if (router.url === '/key-partners/home/my-quotation') {
            user.updateNotifStatus({ field: 'quotation' }).subscribe({
              next: (res: any) => {
                this.links[5].data = '';
              },
            });
          } else if (router.url === '/key-partners/home/my-inventory') {
            user.updateNotifStatus({ field: 'kpInv' }).subscribe({
              next: (res: any) => {
                this.links[7].data = '';
              },
            });
          }
        }
      },
    });
  }
  // public data: any = {};
  public img: string = '';

  ngOnInit(): void {
    this.showToggle = window.innerWidth <= 820 ? true : false;
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.img = token.img?.includes('https')
      ? token.img
      : `${environment.apiV1}${token.img}`;

    this.user.getNotificationCounts().subscribe({
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

    if (!this.socket.isConnected()) {
      let data: any = jwtDecode(localStorage.getItem('ACCESS') as string);
      this.socket.emit('join', { id: data.sub });

      // listeners

      // coa-nda
      this.socket.listen('new coa-nda').subscribe({
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
      this.socket.listen('new soa').subscribe({
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
      this.socket.listen('new quotation').subscribe({
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
      this.socket.listen('keypartner inventory warning').subscribe({
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
    }
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
    this.status = window.innerWidth < 821 ? true : this.status;
  }

  errorImage(evt: any) {
    evt.target.src = '/assets/images/landingpage/header/logo.png';
  }
}
