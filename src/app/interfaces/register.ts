import { AbstractControl } from '@angular/forms';

export interface Register {
  name: AbstractControl<string | null>;
  // addr: AbstractControl<string | null>;
  contact: AbstractControl<string | null>;
  email: AbstractControl<string | null>;
  company: AbstractControl<string | null>;
  bldgNum: AbstractControl<string | null>;
  street: AbstractControl<string | null>;
  brgy: AbstractControl<string | null>;
  city: AbstractControl<string | null>;
  province: AbstractControl<string | null>;
  zip: AbstractControl<string | null>;
}
