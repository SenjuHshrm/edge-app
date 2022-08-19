import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectKeypartnerComponent } from 'src/app/components/modals/select-keypartner/select-keypartner.component';

@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit {
  public kp: string = 'Selected Key Partners Here';
  public filename: string = 'Selected File';

  constructor(private md: NgbModal) {}

  ngOnInit(): void {}

  selectKP() {
    let selectKP = this.md.open(SelectKeypartnerComponent, { size: 'md' });
    selectKP.result
      .then((res) => {
        if (res.success) {
          this.kp = res.name;
          console.log(res.id);
        }
      })
      .catch(() => console.log());
  }

  selectFile() {
    (<HTMLInputElement>document.getElementById('soa')).click();
  }

  changeFile(evt: any) {
    this.filename = evt.target.files[0].name;
  }
}
