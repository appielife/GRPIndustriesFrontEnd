import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { AuthService } from "../../../services/auth.service";
declare var SiteJS: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  providers: [AuthService]
})
export class HomeComponent {
  constructor(private authService: AuthService) {}
  isLoggedIn;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthorized();
    // Custom JQuery code for Faq Questions list
    $(document).ready(function() {
      $(".card-header button").on("click", function() {
        // tslint:disable-next-line:prefer-const
        let FontIcon = $(this).find("span");
        if (
          $(this)
            .find(FontIcon)
            .hasClass("ti-plus")
        ) {
          $(".card-header button span")
            .removeClass("ti-minus")
            .addClass("ti-plus");
          $(this)
            .find(FontIcon)
            .removeClass("ti-plus")
            .addClass("ti-minus");
        } else {
          $(this)
            .find(FontIcon)
            .addClass("ti-plus")
            .removeClass("ti-minus");
        }
      });
    });
  }
}
