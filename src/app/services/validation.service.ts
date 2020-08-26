import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ValidationService {
  constructor() {}
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
