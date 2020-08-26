import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstService } from "./const.services";
import { AuthService } from "./auth.service";
@Injectable()
export class LoginService {
  public token: String;
  header = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private constService: ConstService,
    private authService: AuthService
  ) {
    this.header = new HttpHeaders({ "Content-Type": "application/json" });
  }
  login(user) {
    return this.http.post(this.constService.API_URL + "user/verify", user);
  }


  getOTP(user) {
    return this.http.post(this.constService.API_URL + "user/getotp", user);
  }
  getBankToken(vendorKey) {
    return this.http.post(this.constService.API_URL + "login/auth", vendorKey);
  }
}
