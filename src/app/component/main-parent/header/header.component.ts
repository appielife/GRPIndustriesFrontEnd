import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  isLoggedIn;
  GoToLogin() {
    this.router.navigate(["login"]);
  }
  GoToLogout() {
    window.sessionStorage.clear();
    this.router.navigate(["dashboard"]);
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthorized();
  }
}
