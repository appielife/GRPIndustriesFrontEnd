import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TransferService } from "../../services/transfer.service";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';

import { ValidationService } from "../../services/validation.service";
import { Subscription } from "rxjs";
import { PlatformLocation } from "@angular/common";
import { parse } from "querystring";
import { filter } from "rxjs/operator/filter";
import * as moment from 'moment'

declare var SiteJS: any;
@Component({
  selector: 'app-stock-calculator',
  templateUrl: './stock-calculator.component.html',
  styleUrls: ['./stock-calculator.component.css'],
  providers: [ValidationService, UserService, TransferService]
})
export class StockCalculatorComponent implements OnInit {
  totalcc: any;
  totalAmount: any;
  party_uid: any;
  item_name: any;
  order_date: any = moment(new Date()).format('YYYY-MM-DD');
  vehicle_info: any;
  dataArray: any = [];
  stockDetails: any = [];
  stockDic: any = {}

  thickness_category: any[] = [
    { value: 1, name: '1 inch' },
    { value: 1.5, name: '1.5 inch' },
    { value: 2, name: '2 inch' },
    { value: 2.5, name: '2.5 inch' },
    { value: 3, name: '3 inch' },
    { value: 3.5, name: '3.5 inch' }

  ];

  length_category: any[] = [
    { value: 1, name: '1 feet' },
    { value: 2, name: '2 feet' },
    { value: 3, name: '3 feet' },
    { value: 4, name: '4 feet' },
    { value: 5, name: '5 feet' },
    { value: 6, name: '6 feet' },
    { value: 7, name: '7 feet' },
    { value: 8, name: '8 feet' },
    { value: 9, name: '9 feet' },
    { value: 10, name: '10 feet' },
    { value: 11, name: '11 feet' },
    { value: 12, name: '12 feet' },
    { value: 13, name: '13 feet' },
    { value: 14, name: '14 feet' },
    { value: 15, name: '15 feet' }
  ];

  width_categories: any[] =
    [
      {
        size: '3',
        qty: 0,
      },
      {
        size: '4',
        qty: 0,
      },
      {
        size: '5',
        qty: 0,
      },
      {
        size: '6',
        qty: 0,
      },
      {
        size: '7',
        qty: 0,
      },
      {
        size: '8',
        qty: 0,
      },
      {
        size: '9',
        qty: 0,
      },
    ];

  desiredObject: any = {
    desired_thickness: 0,
    desired_length: 0,
    desired_width: this.width_categories,
    sum: 0
  }

  clientDetails: any = [];

  datasetCopy: any;

  temp: any = "abbcd";
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

  ngOnInit() {
    // console.log(this.categories[1].name);
    this.fetchData();
  }



  fetchData() {

    this.userService.getUserDetail().subscribe(result => {
      console.log('This is user result', result);
      if (result["status"]) {
        this.clientDetails = result["success"];
        console.log('clientDetails', this.clientDetails);

      }
    });

    this.transactionService.getProducts().subscribe(result => {
      if (result["status"]) {
        var result_obj = result["success"]
        this.datasetCopy = result_obj;
        console.log('Result Data', result_obj);

        this.thickness_category = result_obj.thickness_info;
        this.length_category = result_obj.length_info;
        this.width_categories = result_obj.width_info.map(function (el) {
          var o = Object.assign({}, el);
          o.qty = 0;
          return o;
        })
        this.desiredObject = {
          desired_thickness: this.thickness_category,
          desired_length: this.length_category,
          desired_width: this.width_categories,
          sum: 0,
        }
        this.dataArray.push(this.desiredObject);

      }
      else {
        console.log(result);

      }

    })



    this.transactionService.getStockInfo().subscribe(result => {
      console.log('This is Stock result', result);
      if (result["status"]) {
        this.stockDetails = result["success"];
        this.stockDetails.map((v) => {
          this.stockDic[v.thicknessId.toString() + " " + v.lengthId.toString() + " " + v.widthId.toString()] = v
        })
        console.log('stockDetails', this.stockDetails);
        console.log('stockDic', this.stockDic);

      }
      else {
        this.toastr.error('Error', result["error"].toString());

      }
    });

  }

  onAddPress(i, y) {
    // console.log('This is indexes', i, y);
    // console.log('this is value',parseFloat(this.dataArray[i].desired_width[y].qty));
    this.dataArray[i].desired_width[y].qty = parseFloat(this.dataArray[i].desired_width[y].qty) + 1;

  }

  onSubtractPress(i, y) {
    if (parseFloat(this.dataArray[i].desired_width[y].qty) > 0) {
      this.dataArray[i].desired_width[y].qty = parseFloat(this.dataArray[i].desired_width[y].qty) - 1;
    }


  }
  onDeletePress(index: any) {
    this.dataArray.splice(index, 1);
  }



  onAddLot() {
    this.thickness_category = this.datasetCopy.thickness_info;
    this.length_category = this.datasetCopy.length_info;
    this.width_categories = this.datasetCopy.width_info.map(function (el) {
      var o = Object.assign({}, el);
      o.qty = 0;
      return o;
    })
    this.desiredObject = {
      desired_thickness: this.thickness_category,
      desired_length: this.length_category,
      desired_width: this.width_categories,
      sum: 0,

    }
    this.dataArray.push(this.desiredObject);
  }

  onSubmit() {
    let valid = true;
    this.calculateSum()
    this.makeObject()
      .then((filteredObject) => {
        console.log(filteredObject);
        if (this.party_uid == undefined) {
          valid = false;
          this.toastr.warning('Select Party name', 'Warning');
        }
        if (this.vehicle_info == undefined) {
          valid = false;
          this.toastr.warning('Enter vehicle information', 'Warning');
        }
        if (this.order_date == undefined) {
          valid = false;
          this.toastr.warning('Enter date', 'Warning');
        }
        if (filteredObject['dataArray'].length == 0) {
          valid = false;
          this.toastr.warning('Enter Stock information', 'Warning');
        }
        if (valid) {
          this.sendOrderToServer(filteredObject);
        }
      })


  }

  sendOrderToServer(filteredObject) {
    this.transactionService.submitOrder(filteredObject).subscribe(result => {
      console.log('This is result for submit order', result);
      if (!result["status"]) {
        let errorStack = result["error"];
        errorStack.map((o) => {
          this.toastr.error('Error', o.toString());
        })
      }
      else {
        this.toastr.success('Success', result["success"][0].toString());
      }
    });
  }

  // filtering object to only include elements with non- zero quantity
  async makeObject() {
    let filteredDataArray = JSON.parse(JSON.stringify(this.dataArray))
    filteredDataArray = filteredDataArray.filter((o, k) => {
      let new_o = o.desired_width.filter((oo, kk) => {
        if (oo.qty > 0) {
          return oo;
        }
      })
      if (new_o.length > 0) {
        o.desired_width = new_o
        return o;
      }
    });
    let obj = {
      party_uid: this.party_uid,
      item_name: this.item_name,
      order_date: this.order_date,
      vehicle_info: this.vehicle_info,
      dataArray: await filteredDataArray
    }
    return obj;

  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
  }

  calculateSum() {
    console.log('This is data array,', this.dataArray);
    this.makeObject()
      .then((filteredObj) => {
        let i, j: any;
        let total_width: any = 0
        this.totalcc = 0; this.totalAmount = 0;
        console.log('I am data array length', this.dataArray.length);
        for (i = 0; i < this.dataArray.length; i++) {
          total_width = 0;
          for (j = 0; j < this.dataArray[i].desired_width.length; j++) {
            if (this.dataArray[i].desired_width[j].qty != 0) {
              this.dataArray[i].desired_width[j].sum = this.getCC(parseFloat(this.dataArray[i].desired_thickness.value) , parseFloat(this.dataArray[i].desired_length.value) , parseFloat(this.dataArray[i].desired_width[j].value) , parseFloat(this.dataArray[i].desired_width[j].qty))
              this.dataArray[i].desired_width[j].price = (this.getPrice(this.dataArray[i].desired_thickness.id, this.dataArray[i].desired_length.id, this.dataArray[i].desired_width[j].id))

              this.totalcc = this.totalcc + this.dataArray[i].desired_width[j].sum;
              this.totalAmount = this.totalAmount + this.dataArray[i].desired_width[j].price;
            }
          }
        }
      })
  }

  // Get price based on id
  getPrice(thicknessId, lengthId, widthId) {
    return (this.stockDic[thicknessId.toString() + " " + lengthId.toString() + " " + widthId.toString()].price)

  }  
  getCC(t, l, w, q){
    return ((t*l*w*q)/1728).toFixed(2)
  }



}
