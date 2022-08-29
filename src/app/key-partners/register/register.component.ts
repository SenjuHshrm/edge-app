import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/interfaces/register';
import { Response } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup<Register>;

  public loading: boolean = false;

  constructor(private user: UserService) {
    this.registerForm = new FormGroup<Register>({
      name: new FormControl('', [Validators.required]),
      addr: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  register(evt: any, data: FormGroup<Register>) {
    evt.preventDefault();
    if (data.valid) {
      this.loading = true;
      let req = { ...data.value, accessLvl: 3, img: '' };
      this.user.registerKeyPartner(req).subscribe({
        next: (res: Response) => {
          console.log(res);
          Swal.fire(
            'Success',
            'Your account is registered successfully. Please wait for the email confirmation',
            'success'
          ).then((result: any) => {
            this.initializeForm();
          });
          this.loading = false;
        },
        error: (e: any) => {
          console.log(e);
          this.loading = false;
        },
      });
    }
  }

  initializeForm() {
    this.registerForm = new FormGroup<Register>({
      name: new FormControl('', [Validators.required]),
      addr: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
    });
  }
}
