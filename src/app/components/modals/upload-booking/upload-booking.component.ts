import { BookingService } from 'src/app/services/booking.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-booking',
  templateUrl: './upload-booking.component.html',
  styleUrls: ['./upload-booking.component.scss']
})
export class UploadBookingComponent implements OnInit {

  public filename: string = ''
  public file: any;
  public id: string = ''

  constructor(private md: NgbActiveModal, private booking: BookingService) { }

  ngOnInit(): void {
    let token: any = jwtDecode(localStorage.getItem('ACCESS') as string)
    this.id = token.sub
  }

  selectFile() {
    (<HTMLInputElement>document.getElementById('bookingFile')).click()
  }

  changeFile(evt: any) {
    let name = evt.target.files[0].name;
    if(name.substring(name.lastIndexOf('.') + 1) === 'csv') {
      this.filename = name;
      this.file = evt.target.files[0]
    } else {
      Swal.fire('Please select a valid csv file', '', 'info');
      (<HTMLInputElement>document.getElementById('bookingFile')).value = ''
    }
  }

  handleUpload() {
    if(this.file !== null) {
      let bookingData = new FormData()
      bookingData.append('id', this.id)
      bookingData.append('type', 'booking')
      bookingData.append('filename', `BOOKING_${moment().format('MMDDYYYhhmmss')}_${this.id}_${this.filename}`)
      bookingData.append('file', this.file)
      this.booking.uploadBooking(bookingData).subscribe({
        next: (res: any) => {
          Swal.fire({ title: 'Booking uploaded and saved', icon: 'success' })
            .then(() => {
              this.md.close(res.info)
            })
        },
        error: ({error}: any) => {
          console.log(error)
        }
      })
    }
  }

  handleClose = () => {
    Swal.fire({
      title: 'Are you sure you want to continue?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((res) => {
      if (res.isConfirmed) {
        this.md.close();
      }
    });
  }

}