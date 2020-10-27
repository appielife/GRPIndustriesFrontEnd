import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstService } from "./const.services";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class TransferService {
  private messageSource = new BehaviorSubject<any>(null);
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient, private constService: ConstService) {}


  addWoodSpecificationType(obj) {
    return this.http.post(
      this.constService.API_URL + "transaction/addWoodSpecification",
      obj
    );
  }



  submitOrder(transactionObj) {
    return this.http.post(
      this.constService.API_URL + "transaction/submitOrder",
      transactionObj
    );
  }

  getProducts() {
    return this.http.get(
      this.constService.API_URL + "transaction/getproducts"
    );
  }

  getStockInfo() {
    return this.http.get(
      this.constService.API_URL + "transaction/getStockInfo"
    );
  }

  updateStockInfo(obj) {
    return this.http.put(
      this.constService.API_URL + "transaction/updateStockInfo",
      obj
    );
  }

  sendTransactionDetail(transactionObj) {
    return this.http.post(
      this.constService.API_URL + "transaction/savetransactiondetail",
      transactionObj
    );
  }
  sendData(message: any) {
    this.messageSource.next(message);
  }
  verifyOtp(data) {
    return this.http.post(
      this.constService.API_URL + "transaction/verifyotp",
      data
    );
  }
  verifyOtp1(data) {
    return this.http.post(
      this.constService.API_URL + "transaction/verifyotp1",
      data
    );
  }
  resendOtp() {
    return this.http.get(this.constService.API_URL + "transaction/resendotp");
  }

  getCustomers() {
    return this.http.get(this.constService.API_URL + "transaction/getCustomers");
  }
  createCustomer(customerObj:any) {
    return this.http.post(this.constService.API_URL + "transaction/createCustomer",customerObj);
  }
  updateCustomer(customerObj:any) {
    return this.http.put(this.constService.API_URL + "transaction/updateCustomer",customerObj);
  }

  
  getBills() {
    return this.http.get(this.constService.API_URL + "transaction/getBills");
  }


  getInvoice(data){
    return this.http.post(this.constService.API_URL + "transaction/getInvoice",data);
  }

  
}
