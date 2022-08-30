import { environment } from 'src/environments/environment';
import { ContractService } from './../../../services/contract.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coa-nda',
  templateUrl: './coa-nda.component.html',
  styleUrls: ['./coa-nda.component.scss']
})
export class CoaNdaComponent implements OnInit {

  public fileList: any = []
  public isAuth: boolean = false;

  constructor(
    private contract: ContractService
  ) { }

  ngOnInit(): void {
    this.contract.getContract('coa-nda').subscribe({
      next: (res: any) => {
        res.info.forEach((x: any) => {
          let i = x.file.lastIndexOf('/')
          this.fileList.push({
            id: x._id,
            file: `${environment.apiV1}${x.file}`,
            createdAt: x.createdAt,
            filename: x.file.substring(i + 1, x.file.length)
          })
        })
        console.log(res)
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

  authenticate() {
    this.isAuth = !this.isAuth
  }

}
