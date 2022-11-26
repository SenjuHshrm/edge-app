import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ContractService } from './../../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-soa',
  templateUrl: './my-soa.component.html',
  styleUrls: ['./my-soa.component.scss']
})
export class MySoaComponent implements OnInit {

  public fileList: any = []
  public isAuth: boolean = false;
  public password: string = ''

  constructor(
    private contract: ContractService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.contract.getContract('soa').subscribe({
      next: (res: any) => {
        res.info.forEach((x: any) => {
          let i = x.file.lastIndexOf('/')
          this.fileList.push({
            id: x._id,
            url: `${environment.apiV1}${x.url}`,
            createdAt: x.createdAt,
            filename: x.file.substring(i + 1, x.file.length),
            isSeen: x.isSeen
          })
        })
      },
      error: ({ error }: any) => {
        console.log(error)
      }
    })
  }

  authenticate() {
    if(this.password !== '') {
      this.user.authInternalPage({ secPass: this.password }).subscribe({
        next: (_) => {
          this.isAuth = !this.isAuth
        },
        error: ({ error }: any) => {
          Swal.fire({ title: error.msg, icon: 'warning' })
        }
      })
    } else {
      Swal.fire({ title: 'Please input your password', icon: 'warning' })
    }
  }

  markAsSeen(id: string) {
    this.contract.markAsSeen(id).subscribe({
      next: (res: any) => {
        let i = this.fileList.findIndex((x: any) => x.id === id)
        this.fileList[i].isSeen = true
      }
    })
  }

}
