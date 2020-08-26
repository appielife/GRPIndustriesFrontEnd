import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TransferService } from "../../services/transfer.service";
import { ValidationService } from "../../services/validation.service";
import { Subscription } from "rxjs";
import { PlatformLocation } from "@angular/common";
declare var SiteJS: any;
@Component({
  selector: "app-otp2",
  templateUrl: "./otp.component.html",
  providers: [ValidationService]
})
export class OtpComponent implements OnInit {
  formPayment: FormGroup;
  details: any;
  user;
  subscription: Subscription;
  auth_err: any;
  isOtpResent: boolean;
  isOtpResentLoader: boolean;
  constructor(
    private route: ActivatedRoute,
    private fbForm: FormBuilder,
    private transactionService: TransferService,
    private router: Router,
    private validationService: ValidationService,
    location: PlatformLocation
  ) {
    location.onPopState(() => {
      // sessionStorage.clear();
      this.router.navigate(["fund"]);
    });
  }
  ngOnInit() {
    this.subscription = this.transactionService.currentMessage.subscribe(
      data => {
        this.details = data;
        this.formPayment = this.fbForm.group({
          receiverAddress: [this.details.email],
          amount: [this.details.amount],
          otp: [null, [<any>Validators.required]],
          // password: [null, [<any>Validators.required]]
        });
        this.user = JSON.parse(sessionStorage.getItem("auth_data"));
      }
    );
  }
  // tslint:disable-next-line:use-life-cycle-interface
  startTimer() {
    this.isOtpResentLoader = true;
    this.isOtpResent = false;
    this.transactionService.resendOtp().subscribe(result => {
      SiteJS.setupCountdown();
      this.isOtpResent = true;
      this.isOtpResentLoader = false;
    });
  }
  payment(data) {
    if (!this.formPayment.valid) {
      this.validationService.validateAllFormFields(data);
    } else {
      this.transactionService.verifyOtp1(data).subscribe(result => {
        if (result["status"]) {
          this.transactionService.sendData(data);
          this.router.navigate(["wait"]);
        } else {
          this.auth_err = true;
          // this.errorMsg=result['error']
        }
      });
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
