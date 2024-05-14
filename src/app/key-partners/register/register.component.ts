import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/interfaces/register';
import { Response } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import address from './../../../assets/address'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup<Register>;

  public loading: boolean = false;

  public addressList = address;
  public provinces: string[] = []
  public cities: string[] = []
  public brgys: string[] = []

  private subs: Subscription = new Subscription()

  constructor(private user: UserService) {
    this.registerForm = new FormGroup<Register>({
      name: new FormControl('', [Validators.required]),
      // addr: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      bldgNum: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      brgy: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    });
    // console.log(this.addressList)
    // Object.keys(this.addressList).forEach((e) => this.provinces.push(e))
    this.provinces = Object.keys(this.addressList).map((e) => e)
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  register(evt: any, data: FormGroup<Register>) {
    evt.preventDefault();
    if (data.valid) {
      this.loading = true;
      let req = {
        ...data.value,
        accessLvl: 3,
        img: '',
        addr: {
          bldgNum: data.value.bldgNum,
          street: data.value.street,
          brgy: data.value.brgy,
          city: data.value.city,
          province: data.value.province,
          zip: data.value.zip,
        }
      };
      let registerKeyPartner = this.user.registerKeyPartner(req).subscribe({
        next: (res: Response) => {
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
      this.subs.add(registerKeyPartner)
    }
  }

  handleChangeProvince(e: any) {
    let cityList = this.addressList[e.target.value as keyof typeof this.addressList].municipality_list
    this.cities = Object.keys(cityList).map((e) => e)
    this.registerForm.controls['brgy'].setValue('')
  }

  handleChangeCity(e: any) {
    let cityList: any = this.addressList[this.registerForm.controls['province'].value as keyof typeof this.addressList].municipality_list
    this.brgys = cityList[e.target.value as keyof typeof cityList].barangay_list
  }

  initializeForm() {
    this.registerForm = new FormGroup<Register>({
      name: new FormControl('', [Validators.required]),
      // addr: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      bldgNum: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      brgy: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    });
  }
}
