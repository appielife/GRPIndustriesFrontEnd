import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransferService } from "../../services/transfer.service";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-new-loading",
  templateUrl: "./new-loading.component.html",
  styleUrls: ["./new-loading.component.css"],
  providers: [UserService, AuthService]
})
export class NewLoadingComponent implements OnInit {
  subscription: Subscription;
  constructor(
    private router: Router,
    private transactionService: TransferService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.subscription = this.transactionService.currentMessage.subscribe(
      data => {
        this.userService.getTxnStatus().subscribe(result => {
          if (result["success"]) {
            this.router.navigate(["dashboard"]);
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
