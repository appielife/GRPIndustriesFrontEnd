import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TransferService } from "../../services/transfer.service";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';

import { ValidationService } from "../../services/validation.service";
import { Subscription } from "rxjs";
import { PlatformLocation } from "@angular/common";
declare var SiteJS: any;

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.css'],
  providers: [ValidationService, UserService, TransferService]

})


export class StockSummaryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fbForm: FormBuilder,
    private transactionService: TransferService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    location: PlatformLocation
  ) {
    location.onPopState(() => {
      // sessionStorage.clear();
      this.router.navigate(["fund"]);
    });
  }

  dataArray: any = [];
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.transactionService.getStockInfo().subscribe(result => {
      if (result["status"]) {
        this.dataArray = result["success"]
        console.log('This is dataArray', this.dataArray);
      }
      else {
        console.log(result);
      }
    })
  }

  updateRecord(index){
    this.transactionService.updateStockInfo(this.dataArray[index]).subscribe(result => {
      if (result["status"]) {
        console.log('This is dataArray', result["success"]);
        this.toastr.success('Success','Updated successfully');


      }
      else {
        console.log(result);
        this.toastr.error('Error', result["error"].toString());


      }
    })
  }
  ngOnDestroy() {
  }



}