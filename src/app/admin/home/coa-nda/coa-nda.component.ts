import { Component, OnInit } from '@angular/core';
import { KeyPartnerService } from 'src/app/services/key-partner.service';

@Component({
  selector: 'app-coa-nda',
  templateUrl: './coa-nda.component.html',
  styleUrls: ['./coa-nda.component.scss'],
})
export class CoaNdaComponent implements OnInit {
  public keyPartners: any = [];
  public keyList: any = [];
  public filename: string = 'Selected File';

  public data = {
    keyPartner: '',
    keyPartnerId: '',
  };

  constructor(private kp: KeyPartnerService) {}

  ngOnInit(): void {
    this.kp.getActivatedKeyPartners().subscribe({
      next: (res: any) => {
        this.keyPartners = res.info;
      },
    });
  }

  selectFile() {
    (<HTMLInputElement>document.getElementById('coa')).click();
  }

  changeFile(evt: any) {
    this.filename = evt.target.files[0].name;
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
    console.log(data, this.keyPartners, search);
  }

  keyListClick(id: string, name: string) {
    this.data.keyPartnerId = id;
    this.data.keyPartner = name;
    this.keyList = [];
  }
}
