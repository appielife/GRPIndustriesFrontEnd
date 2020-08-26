import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstService } from "./const.services";
import { AuthService } from "./auth.service";
@Injectable()
export class UserService {
  header = new HttpHeaders();
  auth_data;
  constructor(private http: HttpClient, private constService: ConstService) {
    this.header = new HttpHeaders({ "Content-Type": "application/json" });
  }
  getUserDetail() {
    return this.http.get(this.constService.API_URL + "user/getuserdetails");
  }
  getTransactionRecords(status) {
    return this.http.get(
      this.constService.API_URL + "user/gettransactionrecords?status=" + status
    );
  }
  register(details) {
    return this.http.post(this.constService.API_URL + "user/register", details);
  }
  getTxnStatus() {
    return this.http.get(this.constService.API_URL + "user/getTxnStatus");
  }
  getEmail(id) {
    return this.http.get(
      this.constService.API_URL + "user/getemail?email=" + id
    );
  }
  getUSD() {
    return this.http.get(this.constService.API_URL + "user/getEthRate");
  }
  getReceivedTran(status) {
    return this.http.get(
      this.constService.API_URL +
        "transaction/receiveTransaction?status=" +
        status
    );
  }
}
