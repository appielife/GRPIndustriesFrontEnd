import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  providers: [UserService, AuthService]
})
export class DashboardHeaderComponent implements OnInit {
  userDetails: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}
  GotoLogin() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
  ngOnInit() {
    this.userService.getUserDetail().subscribe(result => {
      if (result["success"]) {
        this.userDetails = result["success"];
      }
    });
  }
  dashboardMenu() {
    SiteJS.dashboardmenu();
  }
}
