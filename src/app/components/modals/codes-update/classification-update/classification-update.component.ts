import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClassificationService } from 'src/app/services/classification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classification-update',
  templateUrl: './classification-update.component.html',
  styleUrls: ['./classification-update.component.scss']
})
export class ClassificationUpdateComponent implements OnInit, OnDestroy {
  @Input() public data: any;

  public loading: boolean = false;

  private subs: Subscription = new Subscription()

  constructor(
    private mdCtrl: NgbActiveModal,
    private classServ: ClassificationService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  handleUpdate(e: any) {
    e.preventDefault();
    const { classification, classCode } = e.target;
    if (
      this.validateCode({
        classification: classification.value,
        classCode: classCode.value,
      })
    ) {
      this.loading = true;
      let update = this.classServ
        .update(
          {
            name: classification.value,
            code: classCode.value,
            type: this.data?.type,
          },
          this.data._id
        )
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire({
                title: `${this.data?.type} successfully updated.`,
                icon: 'success',
              });
              this.mdCtrl.close({ success: true, type: this.data?.type });
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
              title: 'Failed to update the code.',
              icon: 'error',
            });
            this.loading = false;
          },
        });
      this.subs.add(update)
    }
  }

  validateCode(data: any) {
    let message = '';
    if (data.classification === '') {
      message = 'Please enter description';
    } else if (data.classCode === '') {
      message = 'Please enter code';
    }

    if (message === '') {
      return true;
    } else {
      Swal.fire(message, '', 'info');
      return false;
    }
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
