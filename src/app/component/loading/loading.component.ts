import { Component, OnInit } from "@angular/core";
import { TransferService } from "../../services/transfer.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  providers: []
})
export class LoadingComponent implements OnInit {
  subscription: Subscription;
  constructor(
    private transactionService: TransferService,
    private router: Router
  ) {}
  ngOnInit() {
    this.subscription = this.transactionService.currentMessage.subscribe(
      data => {
        this.transactionService.verifyOtp(data).subscribe(result => {
          if (result) {
            window.sessionStorage.setItem("result", JSON.stringify(result));
            this.router.navigate(["detail"]);
          }
        });
      }
    );
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
