import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassificationService } from 'src/app/services/classification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classification-update',
  templateUrl: './classification-update.component.html',
  styleUrls: ['./classification-update.component.scss'],
})
export class ClassificationUpdateComponent implements OnInit {
  @Input() public data: any;

  constructor(
    private mdCtrl: NgbActiveModal,
    private classServ: ClassificationService
  ) {}

  ngOnInit(): void {}

  handleUpdate(e: any) {
    e.preventDefault();
    const { classification, classCode } = e.target;
    this.classServ
      .update(
        {
          name: classification.value,
          code: classCode.value,
          type: this.data.type,
        },
        this.data._id
      )
      .subscribe((res) => {
        console.log(res);
        if (res.success) {
          Swal.fire({
            title: `${this.data.type} successfully updated.`,
            icon: 'success',
          });
          this.mdCtrl.close({ success: true, type: this.data.type });
        } else {
          Swal.fire({
            title: res.msg,
            icon: 'error',
          });
        }
      });
  }

  handleClose() {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.mdCtrl.close();
      }
    });
  }
}
