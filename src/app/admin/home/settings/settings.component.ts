import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClassificationService } from 'src/app/services/classification.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassificationUpdateComponent } from 'src/app/components/modals/codes-update/classification-update/classification-update.component';
import jwtDecode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  addButton: boolean = true;
  updateButton: boolean = false;
  indexNum: any;
  public flashTemp: any = null;
  public jntTemp: any = null;

  // classifications
  public classifications: any = [];
  public allClassifications: any = [];
  public clPage: any = 1;
  public clSize: any = 10;
  public clTotalpage: any = 0;
  public clSearch: string = '';

  // color
  public colors: any = [];
  public allColors: any = [];
  public cPage: any = 1;
  public cSize: any = 10;
  public cTotalpage: any = 0;
  public cSearch: string = '';

  // color
  public sizes: any = [];
  public allSizes: any = [];
  public sPage: any = 1;
  public sSize: any = 10;
  public sTotalpage: any = 0;
  public sSearch: string = '';

  public newUsername: string = ''
  // password
  public currentPass: string = '';
  public newPass: string = '';
  public confirmPass: string = '';

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(
    private classServ: ClassificationService,
    private mdCtrl: NgbModal,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.handleGetAllClassifications();
    this.handleGetAllColors();
    this.handleGetAllSizes();
    this.handleGetProfile()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  changeUsername() {
    if(this.validateUsername()) {
      this.loading = true
      let updateUsername = this.user.updateUsername({ username: this.newUsername }).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: res.msg,
            icon: 'success',
          });
          this.loading = false
        },
        error: ({error}: any) => {
          Swal.fire({
            title: error.msg,
            icon: 'success',
          });
          this.loading = false
        }
      })
      this.subs.add(updateUsername)
    }
  }

  changePassword() {
    if (this.validatePassword()) {
      this.loading = true;
      const token: any = jwtDecode(localStorage.getItem('ACCESS') as any);
      let changePassword = this.user
        .changePassword({
          oldPass: this.currentPass,
          newPass: this.newPass,
          id: token.sub,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                title: res.msg,
                icon: 'success',
              });
              this.currentPass = '';
              this.newPass = '';
              this.confirmPass = '';
              this.loading = false;
            } else {
              Swal.fire({
                title: res.msg,
                icon: 'error',
              });
              this.loading = false;
            }
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });
      this.subs.add(changePassword)
    }
  }

  validateUsername() {
    let message = ''
    if(this.newUsername === '') {
      message = 'Please enter new username'
    }

    if(message === '') {
      return true
    } else {
      Swal.fire({
        title: message,
        icon: 'info'
      })
      return false
    }
  }

  validatePassword(): boolean {
    let message = '';
    if (this.currentPass === '') {
      message = 'Please enter current password.';
    } else if (this.newPass === '') {
      message = 'Please enter new password.';
    } else if (this.currentPass === this.newPass) {
      message = 'New password must not match the current password.';
    } else if (this.confirmPass === '') {
      message = 'Please enter confirm new password.';
    } else if (this.newPass !== this.confirmPass) {
      message = 'New password and confirm must match.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire({
        title: message,
        icon: 'info',
      });
      return false;
    }
  }

  handleGetAllColors() {
    let getByType = this.classServ.getByType('color').subscribe((res) => {
      if (res.success) {
        this.colors = res.info;
        this.allColors = res.info;
        this.handlePaging(res.info, 'color');
      } else {
        Swal.fire({
          title: res.msg,
          icon: 'error',
        });
      }
    });
    this.subs.add(getByType)
  }

  handleGetAllSizes() {
    let getByType = this.classServ.getByType('size').subscribe((res) => {
      if (res.success) {
        this.sizes = res.info;
        this.allSizes = res.info;
        this.handlePaging(res.info, 'size');
      } else {
        Swal.fire({
          title: res.msg,
          icon: 'error',
        });
      }
    });
    this.subs.add(getByType)
  }

  handleGetProfile() {
    let getProfile = this.user.getProfile().subscribe({
      next: ({data}: any) => {
        this.newUsername = data.username
      },
      error: ({error}: any) => {
        console.log(error)
      }
    })
    this.subs.add(getProfile)
  }

  handleGetAllClassifications() {
    let getByType = this.classServ.getByType('classification').subscribe((res) => {
      if (res.success) {
        this.classifications = res.info;
        this.allClassifications = res.info;
        this.handlePaging(res.info, 'classification');
      } else {
        Swal.fire({
          title: res.msg,
          icon: 'error',
        });
      }
    });
    this.subs.add(getByType)
  }

  handleClassificationCreate(e: any, type: string) {
    e.preventDefault();
    const { classification, classCode } = e.target;

    const classData = {
      name: classification.value,
      code: classCode.value,
      type,
    };

    if (this.validateClassification(classData)) {
      this.loading = true;
      let createClassification = this.classServ.create(classData).subscribe({
        next: (res: any) => {
          if (res.success) {
            Swal.fire({
              title: `New ${type} has been added.`,
              icon: 'success',
            });
            this.handleReset(type);
            this.loading = false;
          } else {
            Swal.fire({
              title: res.msg,
              icon: 'error',
            });
            this.loading = false;
          }
        },
        error: ({ error }) => {
          Swal.fire({
            title: `Failed to save the new ${type}`,
            icon: 'error',
          });
          this.loading = false;
        },
      });
      this.subs.add(createClassification)
    }
  }

  validateClassification(data: any): boolean {
    let message = '';

    if (data.name === '') {
      message = 'Please enter description.';
    } else if (data.code === '') {
      message = 'Please enter code.';
    } else if (
      data.code.length !== 3 &&
      (data.type === 'color' || data.type === 'size')
    ) {
      message = 'Code must be 3 characters.';
    } else if (data.code.length !== 2 && data.type === 'classification') {
      message = 'Code must be 2 characters only.';
    } else if (
      !/^[0-9]+$/.test(data.code) &&
      (data.type === 'color' || data.type === 'size')
    ) {
      message = 'Code must be composed of numbers only.';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
  }

  handleReset(type: string) {
    let formId = '';

    switch (type) {
      case 'classification':
        this.handleGetAllClassifications();
        formId = 'classification-form';
        break;

      case 'color':
        this.handleGetAllColors();
        formId = 'color-form';
        break;

      default:
        this.handleGetAllSizes();
        formId = 'size-form';
        break;
    }
    (<HTMLFormElement>document.getElementById(formId)).reset();
  }

  handleClassificationUpdate(data: any) {
    let updateClassification = this.mdCtrl.open(ClassificationUpdateComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    updateClassification.componentInstance.data = data;
    updateClassification.result.then((res) => {
      if (res.success) {
        this.handleGetAllClassifications();
        this.handleReset(res.type);
      }
    });
  }

  handleClassificationDelete(id: string, type: string) {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        let deleteClassification = this.classServ.delete(id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Classification has been deleted!.',
              icon: 'success',
            });
            this.handleReset(type);
          } else {
            Swal.fire({
              title: res.msg,
              icon: 'error',
            });
          }
        });
        this.subs.add(deleteClassification)
      } else {
        Swal.fire({
          title: 'Deletion cancelled.',
          icon: 'info',
        });
      }
    });
  }

  handlePagination(data: any, page: any, size: any): any {
    return data.slice((page - 1) * size, size + (page - 1) * size);
  }

  handlePaging(data: any, category: string) {
    switch (category) {
      case 'classification':
        let clTotalPages = Math.floor(data.length / this.clSize);
        if (data.length % this.clSize > 0) clTotalPages += 1;
        this.clTotalpage = clTotalPages;
        break;

      case 'color':
        let cTotalPages = Math.floor(data.length / this.cSize);
        if (data.length % this.cSize > 0) cTotalPages += 1;
        this.cTotalpage = cTotalPages;
        break;

      default:
        let sTotalPages = Math.floor(data.length / this.sSize);
        if (data.length % this.sSize > 0) sTotalPages += 1;
        this.sTotalpage = sTotalPages;
        break;
    }
  }

  handlePage(str: string, category: string) {
    switch (category) {
      case 'classification':
        if (str === 'next') {
          if (this.clPage < this.clTotalpage) {
            this.clPage += 1;
          }
        } else {
          if (this.clPage > 1) {
            this.clPage -= 1;
          }
        }
        break;

      case 'color':
        if (str === 'next') {
          if (this.cPage < this.cTotalpage) {
            this.cPage += 1;
          }
        } else {
          if (this.cPage > 1) {
            this.cPage -= 1;
          }
        }
        break;

      default:
        if (str === 'next') {
          if (this.sPage < this.sTotalpage) {
            this.sPage += 1;
          }
        } else {
          if (this.sPage > 1) {
            this.sPage -= 1;
          }
        }
        break;
    }
  }

  processTempFile(evt: any, type: string) {
    if (type === 'flash') return (this.flashTemp = evt.target.files[0]);
    if (type === 'jnt') return (this.jntTemp = evt.target.files[0]);
  }

  uploadTemp(type: string) {
    let form = new FormData(),
      file = type === 'flash' ? this.flashTemp : this.jntTemp;
    form.append('name', type);
    form.append('file', file);
    let uploadTemp = this.user.uploadTemp(form).subscribe({
      next: (_) => {
        Swal.fire('Success', 'File uploaded successfully', 'success');
      },
    });
    this.subs.add(uploadTemp)
  }
}
