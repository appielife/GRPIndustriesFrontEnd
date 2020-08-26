import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { debug } from 'util';
var Web3 = require('web3');
declare var SiteJS: any;
@Component({
  selector: 'app-crypto-wallet',
  templateUrl: './crypto-wallet.component.html',
  providers: [UserService]
})
export class CryptoWalletComponent implements OnInit {
  transactionHash: any;
  web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/jkYJLm4yhJuFJqGAVvMe'));
  userDetails: any;
  balance: any;
  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getUserDetail().subscribe(result => {
      if (result['success']) {
        this.userDetails = result['success'];
        this.web3.eth.getBalance(this.userDetails.wallet_address, (err, data) => {
          this.balance = this.web3.fromWei(data.toNumber(), 'ether');
        })
      }
    });
  }
  copyCode() {
    SiteJS.initCopy();
  }
}
