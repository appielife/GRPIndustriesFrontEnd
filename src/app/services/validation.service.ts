import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ValidationService {
  constructor() { }
  emailValid(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (
        !control.value.match(
          new RegExp(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          )
        )
      ) {
        resolve({ emailValid: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  panValid(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (control.value == null || control.value == "") {
        resolve(null)
      } else {
        if (
          !control.value.match(
            new RegExp(
              /[A-Z]{5}[0-9]{4}[A-Z]{1}/
            )
          )
        ) {
          resolve({ panValid: true });
        } else {
          resolve(null);
        }
      }
    });
    return promise;
  }

  gstValid(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (control.value == null || control.value == "") {
        resolve(null);
      } else {
        if (!control.value.match(new RegExp(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/))) {
          resolve({ gstValid: true });
        } else {
          resolve(null);
        }
      }
    });
    return promise;
  }

  // a manual function to check if email is in valid format
  isEmailValid(email) {
    if (email.match(new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    ))) {
      return true;
    }
    else {
      return false;
    }

  }
  amountValid(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (!control.value.match(new RegExp(/^[1-9]+|^\d(\.\d{1,18})?$/))) {
        resolve({ amountValid: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
