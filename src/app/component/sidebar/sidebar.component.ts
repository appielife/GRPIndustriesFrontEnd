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
    /* menu click side penl closed */
    $(".mobile-SidePanel li a").click(function() {
      $(".sidebar_menu").removeClass("open");
      $(".closedOverlay").removeClass("open");
    });
  }
}
