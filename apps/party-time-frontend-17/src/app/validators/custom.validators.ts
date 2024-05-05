import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static futureDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    const currentDate = new Date();
    const selectedDate = new Date(value);

    return selectedDate > currentDate ? null : { futureDate: true };
  }

  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};

    if (!value) {
      return null;
    }

    if (!/[A-Z]/.test(value)) {
      errors['uppercaseRequired'] = true;
    }

    if (!/[a-z]/.test(value)) {
      errors['lowercaseRequired'] = true;
    }

    if (!/[0-9]/.test(value)) {
      errors['numberRequired'] = true;
    }

    if (!/[ ,!"§$%&/()=?{}[\]\\.+]/.test(value)) {
      errors['specialCharRequired'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
