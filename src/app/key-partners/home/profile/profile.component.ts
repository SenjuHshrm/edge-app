import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { KeyPartnerService } from 'src/app/services/key-partner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private kp: KeyPartnerService) {}
  public data: any = {};

  ngOnInit(): void {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
    this.kp.getOneKeyPartner(token.sub).subscribe({
      next: (res: any) => {
        this.data = res.info;
      },
      error: (e: any) => console.log(e),
    });
  }

  errorImage(evt: any) {
    evt.target.src = '/assets/images/landingpage/header/logo.png';
  }
}
