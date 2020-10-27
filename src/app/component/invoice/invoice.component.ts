import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TransferService } from "../../services/transfer.service";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';

import { ValidationService } from "../../services/validation.service";
import { Subscription } from "rxjs";
import { PlatformLocation } from "@angular/common";
import * as moment from 'moment'

// import {indianCurrencyInWords} from 'indian-currency-in-words';
const indianCurrencyInWords = require('indian-currency-in-words');


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [ValidationService, UserService, TransferService]

})
export class InvoiceComponent implements OnInit {
  subscription: Subscription;
  selectedMessage: any
  gst_list={
    "01":	"JAMMU AND KASHMIR",
    "02":	"HIMACHAL PRADESH",
    "03":	"PUNJAB",
    "04":	"CHANDIGARH",
    "05":	"UTTARAKHAND",
    "06":	"HARYANA",
    "07":	"DELHI",
    "08":	"RAJASTHAN",
    "09":	"UTTAR PRADESH",
    "10":	"BIHAR",
    "11":	"SIKKIM",
    "12":	"ARUNACHAL PRADESH",
    "13":	"NAGALAND",
    "14":	"MANIPUR",
    "15":	"MIZORAM",
    "16":	"TRIPURA",
    "17":	"MEGHLAYA",
    "18":	"ASSAM",
    "19":	"WEST BENGAL",
    "20":	"JHARKHAND",
    "21":	"ODISHA",
    "22":	"CHATTISGARH",
    "23":	"MADHYA PRADESH",
    "24":	"GUJARAT",
    "25":	"DAMAN AND DIU",
    "26":	"DADRA AND NAGAR HAVELI",
    "27":	"MAHARASHTRA",
    "28":	"ANDHRA PRADESH (old)",
    "29":	"KARNATAKA",
    "30":	"GOA",
    "31":	"LAKSHWADEEP",
    "32":	"KERALA",
    "33":	"TAMIL NADU",
    "34":	"PUDUCHERRY",
    "35":	"ANDAMAN AND NICOBAR ISLANDS",
    "36":	"TELANGANA",
    "37":	"ANDHRA PRADESH (NEW)"
    }
  invoiceObj = [
    {
      id: 0,
      company_name: '',
      first_name: '',
      last_name: '',
      address1: '',
      address2: '',


    }
  ]

  constructor(
    private route: ActivatedRoute,
    private fbForm: FormBuilder,
    private transactionService: TransferService,
    private userService: UserService,
    private router: Router,
    private validationService: ValidationService,
    private toastr: ToastrService,
    location: PlatformLocation
  ) {
    location.onPopState(() => {
      // sessionStorage.clear();
      this.router.navigate(["fund"]);
    });
  }

  ngOnInit() {
    this.transactionService.getInvoice(JSON.parse(sessionStorage.getItem("invoiceId"))).subscribe(result => {
      if (result["status"]) {
        console.log(result)
        this.invoiceObj = result["success"]
      }
      else {
        this.toastr.error('Error', result["error"].toString());
      }
    })
  }

  getCC(l, b, t, qty) {
    return ((l * b * t * qty) / 1728).toFixed(2);
  }

  getUnitPrice(l, b, t, qty, price) {
    return (price * parseFloat(this.getCC(l, b, t, qty))).toFixed(2);
  }

  getWords(amount) {
    let string = indianCurrencyInWords(parseFloat(amount.toFixed(2)))
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getDate(date){
    let m = moment(date)
    return (m.format('LL') ) 
  }

  getState(gstCode){
    gstCode=gstCode.substring(0,2)
    return this.gst_list[gstCode]

  }



}
