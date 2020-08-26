import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ValidationService } from "../../services/validation.service";
import { TransferService } from "../../services/transfer.service";
// tslint:disable-next-line:import-blacklist
import { Subject } from "rxjs";
declare var SiteJS: any;
let Web3 = require("web3");
import * as $ from "jquery";
@Component({
  selector: "app-transfer-fund",
  templateUrl: "./transfer-fund.component.html",
  providers: [UserService]
})
export class TransferFundComponent implements OnInit {
  ethRate_avlbl: any;
  ethRate_avlBalance: number;
  balance: any;
  balance_avl: any;
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/jkYJLm4yhJuFJqGAVvMe"
    )
  );
  userData: any;
  userDetails: any;
  formSaveTranDetail: FormGroup;
  modalRef: BsModalRef;
  errorMsg = false;
  ethRate: any;
  ethToUSD;
  ethInUSD;
  constructor(
    private userService: UserService,
    private fbForm: FormBuilder,
    private router: Router,
    private validationService: ValidationService,
    private modalService: BsModalService,
    private transferService: TransferService
  ) {}
  ngOnInit() {
    this.populateForm();
    this.userService.getUserDetail().subscribe(result => {
      if (result["success"]) {
        this.userDetails = result["success"];
        this.web3.eth.getBalance(
          this.userDetails.public_address,
          (err, data) => {
            this.getRate();
            SiteJS.hideLoader();
            this.balance = this.web3.fromWei(data.toNumber(), "ether");
            this.balance_avl = this.balance - this.userDetails.blocked_funds;
            this.formSaveTranDetail.setValue({
              walletAddress: this.userDetails.email,
              availableBalance: this.balance_avl,
              email: null,
              amount_usd: null,
              amount: null,
              gasPrice: "4100000000",
              gasLimit: "210000"
            });
          }
        );
      }
    });
    //Advance option collaspe menu
    $(".card-header-caption").click(function() {
      $(".card_content").slideToggle();
      if (
        $(".card-header")
          .find("span")
          .hasClass("ti-plus")
      ) {
        $(".card-header")
          .find("span")
          .removeClass("ti-plus")
          .addClass("ti-minus");
      } else {
        $(".card-header")
          .find("span")
          .addClass("ti-plus")
          .removeClass("ti-minus");
      }
    });
  }
  getRate() {
    this.userService.getUSD().subscribe(result => {
      this.ethRate = result["success"].ETH;
      this.ethRate = 1 / this.ethRate;
      this.ethRate = parseFloat(this.ethRate).toFixed(2);
      this.ethRate_avlbl = parseFloat(this.balance_avl) * this.ethRate;
      this.ethRate_avlbl = parseFloat(this.ethRate_avlbl).toFixed(2);
    });
  }
  populateForm() {
    this.formSaveTranDetail = this.fbForm.group({
      walletAddress: [null, [<any>Validators.required]],
      availableBalance: [null],
      email: [
        null,
        [<any>Validators.required],
        this.validationService.emailValid
      ],
      amount: [
        null,
        [<any>Validators.required],
        this.validationService.amountValid
      ],
      amount_usd:  [
        null,
        [<any>Validators.required],
        this.validationService.amountValid
      ],
      gasPrice: ["210000", , this.validationService.amountValid],
      gasLimit: ["4100000000", , this.validationService.amountValid]
    });
  }
  // tslint:disable-next-line:member-ordering
  advanceOption = false;
  saveTranDetail(submitForm) {
    this.userData = submitForm;
    this.userData.ethRate = this.ethRate;
    this.openModal(this.userData);
  }
  openModal(userData) {
    if (!this.formSaveTranDetail.valid) {
      this.validationService.validateAllFormFields(this.formSaveTranDetail);
    }
    if (this.formSaveTranDetail.valid) {
      if (userData.amount > 0) {
        // this.modalRefrence.hide();
        SiteJS.showLoader();
        this.transferService
          .sendTransactionDetail(userData)
          .subscribe(result => {
            if (result["success"]) {
              // this.onClose.next(true);
              SiteJS.hideLoader();
              const resp = result["success"];
              this.transferService.sendData({
                email: userData.email,
                data: resp.response,
                amount: userData.amount,
                ethRate: userData.ethRate
              });
              this.router.navigate(["otp"]);
            }
          });
 
      } else {
        this.errorMsg = true;
      }
    }
  }
  amountEmpty_eth(event) {
    let amount = this.formSaveTranDetail.controls['amount'].value;
    if (amount) {
      this.errorMsg = false;
      let amount_res=(amount*this.ethRate).toFixed(3)
      this.formSaveTranDetail.patchValue({      
        amount_usd: (amount_res).toString(),      
      });
    }
    else
    {
      this.formSaveTranDetail.patchValue({      
        amount_usd: null,      
      });
    }

  }

  amountEmpty_usd(event) {
    
    let amount_usd = this.formSaveTranDetail.controls['amount_usd'].value;
    
    if (amount_usd) {
      this.errorMsg = false;
      let amount_res=(amount_usd/this.ethRate).toFixed(3)
      this.formSaveTranDetail.patchValue({      
        amount: (amount_res).toString(),      
      });
    }
    else
    {
      this.formSaveTranDetail.patchValue({      
        amount: null,      
      });
    }
    }
}
// }
// @Component({
//   selector: "app-modals",
//   template: `
//   <div class="modal-dialog modal-dialog-centered modal-md m-0">
//     <div class="modal-content">
//       <div class="modal-header bg-blue border-radius-0">
//         <h5 class="text-white text-center display-block">Confirm Transaction </h5>
//       </div>
//         <div class="modal-body">
//           <ul class="child-flex default-reset normal-list list-20">
//             <li class="mt-0">From : </li>
//             <li>{{userData?.walletAddress}}</li>
//             <li>To :</li>
//             <li>{{userData?.email}}</li>
//             <li>ETH : </li>
//             <li>{{userData?.amount}} ETH</li>
//             <li>Gas price : </li>
//             <li>{{userData?.gasPrice}}</li>
//             <li>Gas limit : </li>
//             <li>{{userData?.gasLimit}}</li>
//           </ul>
//           <hr class="seprater">
//           <div class="row">
//             <div class="col-sm-12 text-center">
//               <button class="btn width-40 text-white btn-primary" data-target="#myModal" (click)="confirm()" data-toggle="modal">Confirm</button>
//             </div>
//           </div>
//         </div>
//     </div>
//   </div>
// `,
//   providers: []
// })
// export class ModalsComponent {
//   @Input() userData: any;
//   @Input() modalRefrence;
//   public onClose: Subject<boolean>;
//   amount;
//   toEmail;
//   constructor(
//     private elementRef: ElementRef,
//     private transferService: TransferService,
//     private modalService: BsModalService,
//     private router: Router
//   ) {
//     this.onClose = new Subject();
//   }
//   // tslint:disable-next-line:use-life-cycle-interface
//   confirm() {
//     this.modalRefrence.hide();
//     SiteJS.showLoader();
//     this.amount = this.userData.amount;
//     this.toEmail = this.userData.email;
//     const ethRate = this.userData.ethRate;
//     this.transferService
//       .sendTransactionDetail(this.userData)
//       .subscribe(result => {
//         if (result["success"]) {
//           this.onClose.next(true);
//           SiteJS.hideLoader();
//           const resp = result["success"];
//           this.transferService.sendData({
//             email: this.toEmail,
//             data: resp.response,
//             amount: this.amount,
//             ethRate: ethRate
//           });
//           this.router.navigate(["otp"]);
//         }
//       });
//   }
// }
