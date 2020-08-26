import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";
import { UserService } from "../../services/user.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { TransferService } from "../../services/transfer.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UserService, AuthService]
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  error: any;
  id: any;
  values = {
    email: ""
  };
  constructor(
    private fbForm: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransferService
  ) {}
  ngOnInit() {
    this.id = this.activatedRoute.params["_value"].email;
    this.formRegister = this.fbForm.group(
      {
        firstName: [null, [<any>Validators.required]],
        lastName: [null, [<any>Validators.required]],
        email: [
          null,
          [<any>Validators.required],
          this.validationService.emailValid
        ],
        password: [null, [<any>Validators.required]],
        password_confirm: [null, [<any>Validators.required]]
      },
      {
        validator: this.matchingPasswords("password", "password_confirm")
      }
    );
    this.userService.getEmail(this.id).subscribe(result => {
      this.values.email = result["success"];
      this.formRegister.setValue({
        firstName: null,
        lastName: null,
        email: this.values.email,
        password: null,
        password_confirm: null
      });
    });
  }
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (
        passwordInput.value != null &&
        passwordConfirmationInput.value != null &&
        passwordInput.value !== passwordConfirmationInput.value &&
        (passwordInput.value !== "" && passwordConfirmationInput.value !== "")
      ) {
        return { matchingPasswords: true };
      } else {
        return null;
      }
    };
  }
  register(details) {
    if (!this.formRegister.valid) {
      this.validationService.validateAllFormFields(this.formRegister);
    } else {
      this.userService.register(details).subscribe(result => {
        if (result["success"]) {
          this.authService.setAuthorizationHeader(result["success"]);
          this.router.navigate(["newloading"]);
        } else {
          this.error = result["error"];
        }
      });
    }
  }
}
