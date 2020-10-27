import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TransferService } from "../../services/transfer.service";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';

import { ValidationService } from "../../services/validation.service";
import { Subscription } from "rxjs";
import { PlatformLocation } from "@angular/common";


declare var SiteJS: any;



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [ValidationService, UserService, TransferService]

})
export class CustomersComponent implements OnInit {
  customerForm: FormGroup;
  customers: any = [];

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
    //Form for making customer 
    this.customerForm = this.fbForm.group({
      company_name: [null, [<any>Validators.required]],
      first_name: [null, [<any>Validators.required]],
      last_name: [null, [<any>Validators.required]],
      pan: [null, [],this.validationService.panValid],
      gst_tin: [null, [], this.validationService.gstValid],
      address1: [null],
      address2: [null],
      city: [null],
      state: [null],
      pincode: [null],
      phone1: [null, [<any>Validators.required]],
      phone2: [null],
      email: [null, [<any>Validators.required], this.validationService.emailValid]
    });

    //get customers to popilate table
    this.transactionService.getCustomers().subscribe(result => {
      if (result["status"]) {
        console.log(result);
        this.customers = result["success"];
      }
      else {
        console.log(result);

        this.toastr.error('Error', result["error"].toString());
      }

    })

  }

  //other variables
  obj: any;
  name: any;
  value: any;
  description;
  stock_uid: any;

  specificationType: any = [
    {
      id: '1',
      value: 'Length'
    },
    {
      id: '2',
      value: 'Width'
    },
    {
      id: '3',
      value: 'Thickness'
    },
  ];


  createCustomer(customerObject:any) { 
    if (!this.customerForm.valid) {
      console.log(this.customerForm)
      this.validationService.validateAllFormFields(this.customerForm);
    }
    else {
      console.log(customerObject);
      this.transactionService.createCustomer(customerObject).subscribe(result => {
        if (result["status"]) {
          this.toastr.success('Success', result["error".toString()]);
        }
        else {
          this.toastr.error('Error', result["success"].toString());
        }
      });
    }

  }


  updateCustomer(customerObject){
    var customerFormUpdated: FormGroup;
     customerFormUpdated = this.fbForm.group({
      id:[customerObject.id],
      email: [customerObject.email, [<any>Validators.required], this.validationService.emailValid],
      company_name: [customerObject.company_name, [<any>Validators.required]],
      first_name: [customerObject.first_name, [<any>Validators.required]],
      last_name: [customerObject.last_name, [<any>Validators.required]],
      pan: [customerObject.pan, [],this.validationService.panValid],
      gst_tin: [customerObject.gst_tin, [], this.validationService.gstValid],
      address1: [customerObject.address1],
      address2: [customerObject.address2],
      city: [customerObject.city],
      state: [customerObject.state],
      pincode: [customerObject.pincode],
      phone1: [customerObject.phone1, [<any>Validators.required]],
      phone2: [customerObject.phone2],
    });
    setTimeout(() => { 

    if (customerFormUpdated.status=='VALID') {
      console.log("customerFormUpdated");
      this.transactionService.updateCustomer(customerFormUpdated.value).subscribe(result => {
        console.log(result)
        if (result["status"]) {
          this.toastr.success('Success', result["success"].toString());
        }
        else {
          this.toastr.error('Error', result["error"].toString());
        }
      });
    }
    else {
      console.log(customerFormUpdated.status);
      console.log(customerFormUpdated);
      this.toastr.error('Error', 'Please check your input');
      this.validationService.validateAllFormFields(customerFormUpdated);
    }
  }, 2);
  }

}
