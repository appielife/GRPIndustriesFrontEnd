import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { debug } from 'util';
const Web3 = require('web3');
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-old-summary',
  templateUrl: './old-summary.component.html',
  providers: [UserService]
})
export class OldSummaryComponent implements OnInit {
  errorMsg: boolean;
  transactionHash: any;
  web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/jkYJLm4yhJuFJqGAVvMe'));
  userRecords: any;
  balance: any;
  sendTran;
  recTran;
  modalRef: BsModalRef;
  constructor(private router: Router, private userService: UserService, private modalService: BsModalService) { }
  // Transcition hash collaspe
  openHash(i) {
    $('.tr-hash' + i).siblings('#card_content' + i).slideToggle();
    const GetIcon = $('.tr-hash' + i).find('span');
    if ($(GetIcon).hasClass('ti-plus')) {
      $(GetIcon).removeClass('ti-plus').addClass('ti-minus');
    } else {
      $(GetIcon).removeClass('ti-minus').addClass('ti-plus');
    }
  }
  details(item) {
    this.openModal(item);
  }
  ngOnInit() {
    this.sentTransaction(null);
  }
  statusValue(status) {
    if (status === undefined) {
      status = null;
    }
    if (this.sendTran) {
      this.sentTransaction(status.value);
    } else {
      this.receivedTransaction(status.value);
    }
  }
  sentTransaction(status) {
    this.userService.getTransactionRecords(status).subscribe(result => {
      if (result['success']) {
        this.userRecords = result['success'];
        this.sendTran = true;
        this.recTran = false;
      }
    });
  }
  receivedTransaction(status) {
    this.userService.getReceivedTran(status).subscribe(result => {
      if (result['success']) {
        this.userRecords = result['success'];
        this.recTran = true;
        this.sendTran = false;
      }
    });
  }
  openModal(userData) {
    if (userData) {
      this.modalRef = this.modalService.show(DetailsComponent,
        Object.assign({}, {
          animated: true,
          keyboard: true,
          backdrop: true,
          ignoreBackdropClick: false
        }));
      this.modalRef.content.userData = userData;
      this.modalRef.content.modalRefrence = this.modalRef;
    } else {
      this.errorMsg = true;
    }
  }
}
@Component({
  selector: 'app1-modals',
  template: `
  <div class="modal-dialog m-0">
    <div class="modal-content">
      <div class="modal-header bg-blue border-radius-0">
      <h5 class="text-white text-center display-block">Advance options </h5>
      </div>
      <div class="modal-body">
      <ul class="child-flex default-reset normal-list list-20">
      <li class="mt-0">Transaction Hash : </li>
      <li>{{userData?.txnAdd}}</li>
      
    </ul>
      </div>
      <div class="row">
      <div class="col-sm-12 text-center pb-4">
        <button type="button" (click)="hide()" class="btn width-40 text-white btn-primary" data-dismiss="modal">Close</button>
      </div>
      </div>
    </div>
  </div>



`,
  providers: []
})
export class DetailsComponent {
  @Input()
  userData: any;
  @Input()
  modalRefrence;
  constructor() {
  }
  ngOnInit() {
  }
  hide() {
    this.modalRefrence.hide();
  }
}