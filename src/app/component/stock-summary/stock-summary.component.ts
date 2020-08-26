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
  providers: [ValidationService,UserService,TransferService]

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
  )
  
  {
    location.onPopState(() => {
      // sessionStorage.clear();
      this.router.navigate(["fund"]);
    });
  }




  totalcc:any;
  party_uid:any;
  item_name:any;
  order_date:any;
  vehicle_info:any;
  searchObj:any={
    length_id:0,
    thickness_id:0
  }

  thickness_category:any[]=[
    {value:1, name:'1 inch'},
    {value:1.5, name:'1.5 inch'},
    {value:2, name:'2 inch'},
    {value:2.5, name:'2.5 inch'},
    {value:3, name:'3 inch'},
    {value:3.5, name:'3.5 inch'}

  ];

  length_category:any[]=[
    {value:1, name:'1 feet'},
    {value:2, name:'2 feet'},
    {value:3, name:'3 feet'},
    {value:4, name:'4 feet'},
    {value:5, name:'5 feet'},
    {value:6, name:'6 feet'},
    {value:7, name:'7 feet'},
    {value:8, name:'8 feet'},
    {value:9, name:'9 feet'},
    {value:10, name:'10 feet'},
    {value:11, name:'11 feet'},
    {value:12, name:'12 feet'},
    {value:13, name:'13 feet'},
    {value:14, name:'14 feet'},
    {value:15, name:'15 feet'}  
  ];

  width_categories:any[]=
    [
      {
        size:'3',
        qty:0,
      },
      {
        size:'4',
        qty:0,
      },
      {
        size:'5',
        qty:0,
      },
      {
        size:'6',
        qty:0,
      },
      {
        size:'7',
        qty:0,
      },
      {
        size:'8',
        qty:0,
      },      
      {
        size:'9',
        qty:0,
      },
    ]  ; 
  
  desiredObject:any={
    desired_thickness:0,
    desired_length:0,
    desired_width:this.width_categories,
    sum:0
  }

  clientDetails:any=[];

  dataArray:any=[];
  datasetCopy:any;

  temp:any="abbcd";



  
  ngOnInit() {
    this.fetchData();
  }


  
  statusValue(type,value) {
  if(type==0)
  {
    this.searchObj.thickness_id=value.id;
  }
  if(type==1)
  {
    this.searchObj.length_id=value.id;
  }
  console.log("This is search Object",this.searchObj);
  }
  

  fetchData(){ 

   this.transactionService.getStockInfo().subscribe(result=>{
    if(result["status"])
    {
      this.dataArray=result["success"]    
      console.log('This is dataArray', this.dataArray);
      
    }
 else
 {
   console.log(result);
 }

   })

  }

  onAddPress(i, y){
    // console.log('This is indexes', i, y);
    // console.log('this is value',parseFloat(this.dataArray[i].desired_width[y].qty));
    this.dataArray[i].desired_width[y].qty= parseFloat(this.dataArray[i].desired_width[y].qty)+1;

  }

  onSubtractPress(i, y){
    if( parseFloat(this.dataArray[i].desired_width[y].qty)>0)
    {
      this.dataArray[i].desired_width[y].qty= parseFloat(this.dataArray[i].desired_width[y].qty)-1;
    }


  }
  onDeletePress(index:any){
    this.dataArray.splice(index,1);
  }

 

  onAddLot(){
    this.thickness_category=this.datasetCopy.thickness_info;
      this.length_category=this.datasetCopy.length_info;
      this.width_categories = this.datasetCopy.width_info.map(function(el) {
        var o = Object.assign({}, el);
        o.qty = 0;
        return o;
      })     
      this.desiredObject={
        desired_thickness:this.thickness_category,
        desired_length:this.length_category,
        desired_width:this.width_categories,
        sum:0,
      }
      this.dataArray.push(this.desiredObject);
  }

  onSubmit()
  {
    console.log("This is data", this.makeObject());
    this.calculateSum(); 

    this.sendOrderToServer();
  
  }

  sendOrderToServer(){
    this.transactionService.submitOrder(this.makeObject()).subscribe(result =>{
      console.log('This is result for submit order', result);
      if(!result["status"])
      {
        this.toastr.error('Error', result["success"].toString());

      }
      else
      {
        this.toastr.success('Success', result["error".toString()]);

      }
    });  
  }


  makeObject()
  {
    let obj={
      party_uid:this.party_uid,
      item_name:this.item_name,
      order_date:this.order_date,
      vehicle_info:this.vehicle_info,
      dataArray:this.dataArray      
    }
    console.log("obj", obj);
    return obj;

  
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
  }

  calculateSum() 
  {

    console.log('This is data array,', this.dataArray );
    let i,j :any;    
    let total_width:any=0
    this.totalcc=0;
    console.log('I am data array length',this.dataArray.length);
    for(i=0;i<this.dataArray.length;i++)
    {   
      total_width=0;
      for(j=0;j<this.dataArray[i].desired_width.length;j++)
      {
        total_width=parseFloat(total_width)+(parseFloat(this.dataArray[i].desired_width[j].value)*parseFloat(this.dataArray[i].desired_width[j].qty));
        console.log('this is total width', total_width);
      } 
      this.dataArray[i].sum =(parseFloat(this.dataArray[i].desired_thickness.value)* parseFloat(this.dataArray[i].desired_length.value) * parseFloat(total_width))     
      this.totalcc=parseFloat(this.totalcc)+parseFloat(this.dataArray[i].sum);
      this.dataArray[i].sum = (this.dataArray[i].sum/1728).toFixed(3);
    }

    this.totalcc=(this.totalcc/1728).toFixed(3);
    console.log(parseFloat(this.totalcc));
  }







}