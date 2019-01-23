import { AbstractControl, ValidationErrors  } from '@angular/forms';

export function ValidatePhoneAsNumber(control: AbstractControl): ValidationErrors {

  const isnum = /^\d+$/.test(control.value);

  if (isnum || control.value === '') {
    return null;
  } else { return { phoneasnumber: true }; }
}
