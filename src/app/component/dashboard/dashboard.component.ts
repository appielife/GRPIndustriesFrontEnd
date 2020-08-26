import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service';
import { debug } from 'util';
let Web3 = require('web3');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [UserService]
})
export class DashboardComponent implements OnInit {
  ethRate_total: any;
  ethRate_avlbl: any;
  ethRate: any;
  transactionHash: any;
  web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/jkYJLm4yhJuFJqGAVvMe'));
  userDetails: any;
  balance: any;
  balance_avl: any;
  constructor(private router: Router, private userService: UserService) { }
  ngOnInit() {
    this.userService.getUserDetail().subscribe(result => {
      if (result['success']) {
        this.userDetails = result['success'];
        this.web3.eth.getBalance(this.userDetails.public_address, (err, data) => {
          this.getRate();
          SiteJS.hideLoader();
          this.balance = this.web3.fromWei(data.toNumber(), 'ether');
          this.balance_avl = this.balance-this.userDetails.blocked_funds;
        

 
        });   
      }
    });
  }

  getRate() {

    
    this.userService.getUSD().subscribe(result => {
      this.ethRate = result["success"].ETH;
      this.ethRate = 1 / this.ethRate;
      this.ethRate = parseFloat(this.ethRate).toFixed(2);
      this.ethRate_avlbl = this.balance_avl * this.ethRate;
      this.ethRate_total = this.balance * this.ethRate;
      this.ethRate_avlbl = parseFloat(this.ethRate_avlbl).toFixed(2);
      this.ethRate_total =  parseFloat(this.ethRate_total).toFixed(2);
    
    });
  }
}
