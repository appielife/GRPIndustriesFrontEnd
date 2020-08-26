import { Component, OnInit } from '@angular/core';
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
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css'],
  providers: [ValidationService,UserService,TransferService]

})
export class StockManagerComponent implements OnInit {

  obj:any;  
  name:any;
  value:any;
  description;
  stock_uid:any;
  specificationType:any=[
    {
    id:'1',
    value:'Length'
    },
    {
      id:'2',
      value:'Width'
    },
    {
      id:'3',
      value:'Thickness'
    },
];
  constructor(
    private route: ActivatedRoute,
    private fbForm: FormBuilder,
    private transactionService: TransferService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    location: PlatformLocation
  )  
  {
    location.onPopState(() => {
      // sessionStorage.clear();
      this.router.navigate(["fund"]);
    });
  }

  ngOnInit() {
  }
  

  
  onSubmit()
  {let obj={
    id:this.stock_uid,
    name:this.name,
    value:this.value,
    description:this.description,
  }
    this.transactionService.addWoodSpecificationType(obj).subscribe(result=>{
      if(result["status"])
      {
        this.toastr.success('Success', result["error".toString()]);
      }
      else
      {
        this.toastr.error('Error', result["success"].toString());
      }
    });

  
  }


 
}
