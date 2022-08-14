import { AbstractControl } from '@angular/forms';

export interface Register {
  name: AbstractControl<string | null>;
  addr: AbstractControl<string | null>;
  contact: AbstractControl<string | null>;
  email: AbstractControl<string | null>;
  company: AbstractControl<string | null>;
}
