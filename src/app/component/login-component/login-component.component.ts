import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { debug } from 'util';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  providers: [LoginService, ValidationService, AuthService]
})
export class LoginComponent implements OnInit {
  invalidUsernamePassword: boolean;
  otpRequested: boolean;
  formLogin: FormGroup;
  constructor(private loginService: LoginService,
    private fbForm: FormBuilder,
    private router: Router, private authService: AuthService,
    private validationService: ValidationService) {
    this.formLogin = this.fbForm.group({
      email: [null, [<any>Validators.required], this.validationService.emailValid],
      otp: [null, [<any>Validators.required]],
    });
  }
  ngOnInit() {
    sessionStorage.clear();
    this.otpRequested = false;

  }

  getOTP(loginModel: any) {
    console.log('Iam pressed', this.validationService.isEmailValid(loginModel.email))
    if (!this.validationService.isEmailValid(loginModel.email)) {
    } else {
      this.loginService.getOTP(loginModel).subscribe((result) => {
        this.authService.setAuthorizationHeader(result['success']);
        if (result['success']) {
          this.invalidUsernamePassword = null;
          this.otpRequested = true;
        }
        if (!result['success'] && result['error']) {
          this.invalidUsernamePassword = result['error'];
        }
      }, (err) => {
        console.log(err);
      });
    }

  }


  login(loginModel: any) {
    if (!this.formLogin.valid) {
      this.validationService.validateAllFormFields(this.formLogin);
    } else {
      this.loginService.login(loginModel).subscribe((result) => {
        console.log("This is result", result);
        this.authService.setAuthorizationHeader(result['success']);
        if (result['success']) {
          this.invalidUsernamePassword = null;
          this.router.navigate(['/calculator']);
        }
        if (!result['success'] && result['error']) {
          this.invalidUsernamePassword = result['error'];
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
}
