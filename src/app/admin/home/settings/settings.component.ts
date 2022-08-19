import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassificationService } from 'src/app/services/classification.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassificationUpdateComponent } from 'src/app/components/modals/codes-update/classification-update/classification-update.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
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

  constructor(
    private classServ: ClassificationService,
    private mdCtrl: NgbModal,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.handleGetAllClassifications();
    this.handleGetAllColors();
    this.handleGetAllSizes();
  }

  handleGetAllColors() {
    this.classServ.getByType('color').subscribe((res) => {
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
  }

  handleGetAllSizes() {
    this.classServ.getByType('size').subscribe((res) => {
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
  }

  handleGetAllClassifications() {
    this.classServ.getByType('classification').subscribe((res) => {
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
  }

  handleClassificationCreate(e: any, type: string) {
    e.preventDefault();
    const { classification, classCode } = e.target;

    this.classServ
      .create({ name: classification.value, code: classCode.value, type })
      .subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: `New ${type} has been added.`,
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
        this.classServ.delete(id).subscribe((res) => {
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
    if(type === 'flash') return this.flashTemp = evt.target.files[0]
    if(type === 'jnt') return this.jntTemp = evt.target.files[0]
  }

  uploadTemp(type: string) {
    // let file = (type === 'flash') ? this.flashTemp : this.jntTemp ;
    // let form = new FormGroup({
    //   name: new FormControl(type),
    //   file: new FormControl(file)
    // })
    let form = new FormData(), file = (type === 'flash') ? this.flashTemp : this.jntTemp;
    form.append('name', type)
    form.append('file', file)
    this.user.uploadTemp(form).subscribe({
      next: (res: any) => {
        console.log(res)
      }
    })
  }
}
