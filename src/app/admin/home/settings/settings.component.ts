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
  public classifications: any = [];
  public colors: any = [];
  public sizes: any = [];

  constructor(
    private classServ: ClassificationService,
    private mdCtrl: NgbModal
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
}
