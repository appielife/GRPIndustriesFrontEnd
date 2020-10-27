import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import * as $ from "jquery";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  providers: [UserService, AuthService]
})
export class SidebarComponent implements OnInit {
  uname: any ="User";
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
      const authData = window.sessionStorage.getItem("auth_data");
      this.uname= JSON.parse(authData).first_name;
    /* menu click side penl closed */
    $(".mobile-SidePanel li a").click(function() {
      $(".sidebar_menu").removeClass("open");
      $(".closedOverlay").removeClass("open");
    });
  }
}
