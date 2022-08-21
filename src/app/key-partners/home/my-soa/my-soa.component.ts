import { environment } from 'src/environments/environment';
import { ContractService } from './../../../services/contract.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-soa',
  templateUrl: './my-soa.component.html',
  styleUrls: ['./my-soa.component.scss']
})
export class MySoaComponent implements OnInit {

  public fileList: any = []

  constructor(
    private contract: ContractService
  ) { }

  ngOnInit(): void {
    this.contract.getContract('soa').subscribe({
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
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

}
