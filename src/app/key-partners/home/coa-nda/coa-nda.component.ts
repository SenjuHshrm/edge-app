import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ContractService } from './../../../services/contract.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coa-nda',
  templateUrl: './coa-nda.component.html',
  styleUrls: ['./coa-nda.component.scss'],
})
export class CoaNdaComponent implements OnInit, OnDestroy {
  public fileList: any = [];
  public isAuth: boolean = false;
  public password: string = '';

  private subs: Subscription = new Subscription()

  constructor(private contract: ContractService, private user: UserService) {}

  ngOnInit(): void {
    let getContract = this.contract.getContract('coa-nda').subscribe({
      next: (res: any) => {
        res.info.forEach((x: any) => {
          let i = x.file.lastIndexOf('/');
          this.fileList.push({
            id: x._id,
            url: `${environment.apiV1}${x.url}`,
            createdAt: x.createdAt,
            filename: x.file.substring(i + 1, x.file.length),
            isSeen: x.isSeen
          });
        });
      },
      error: ({ error }: any) => {
        console.log(error);
      },
    });
    this.subs.add(getContract)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  authenticate() {
    if(this.password !== '') {
      let authInternalPage = this.user.authInternalPage({ secPass: this.password }).subscribe({
        next: (_) => {
          this.isAuth = !this.isAuth
        },
        error: ({ error }: any) => {
          Swal.fire({ title: error.msg, icon: 'warning' })
        }
      })
      this.subs.add(authInternalPage)
    } else {
      Swal.fire({ title: 'Please input your password', icon: 'warning' })
    }
    // this.isAuth = !this.isAuth;
  }

  markAsSeen(id: string) {
    let markAsSeen = this.contract.markAsSeen(id).subscribe({
      next: (res: any) => {
        let i = this.fileList.findIndex((x: any) => x.id === id)
        this.fileList[i].isSeen = true
      }
    })
    this.subs.add(markAsSeen)
  }
}
