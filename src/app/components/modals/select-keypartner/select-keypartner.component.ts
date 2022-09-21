import { Component, OnInit } from '@angular/core';
import { KeyPartnerService } from 'src/app/services/key-partner.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-keypartner',
  templateUrl: './select-keypartner.component.html',
  styleUrls: ['./select-keypartner.component.scss']
})
export class SelectKeypartnerComponent implements OnInit {
  public keyPartners: any = [];
  public keyList: any = [];

  public data = {
    keyPartner: '',
    keyPartnerId: '',
  };

  constructor(private kp: KeyPartnerService, private md: NgbActiveModal) {}

  ngOnInit(): void {
    this.kp.getActivatedKeyPartners().subscribe({
      next: (res: any) => {
        this.keyPartners = res.info;
      },
    });
  }

  handleSearch(evt: any) {
    const search = evt.target.value;
    const data =
      search !== ''
        ? this.keyPartners.filter((e: any) =>
            e.email.toLowerCase().startsWith(search.toLowerCase())
          )
        : [];
    this.keyList = data;
  }

  keyListClick(id: string, name: string) {
    this.data.keyPartnerId = id;
    this.data.keyPartner = name;
    this.keyList = [];
  }

  selectKP() {
    this.md.close({
      success: true,
      id: this.data.keyPartnerId,
      name: this.data.keyPartner,
    });
  }
}
