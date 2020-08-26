import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
var Web3 = require('web3');
@Component({
  selector: 'app-transaction-receipt',
  templateUrl: './transaction-receipt.component.html',
  styleUrls: ['./transaction-receipt.component.css'],
})
export class TransactionReceiptComponent implements OnInit {
  transactionResult: any;
  web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/jkYJLm4yhJuFJqGAVvMe'));
  constructor(location: PlatformLocation, private router: Router) {
    this.transactionResult = JSON.parse(sessionStorage.getItem('result'));
    location.onPopState(() => {
      sessionStorage.clear();
      this.router.navigate(['']);
    });
  }
  ngOnInit() {
  }
}
