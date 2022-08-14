import { AbstractControl } from "@angular/forms";

export interface Login {
  username: AbstractControl<string | null>;
  password: AbstractControl<string | null>;
}
