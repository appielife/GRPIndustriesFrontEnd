import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import {
  AuthGuard,
  AuthService,
  AuthInterceptor,
  After_AuthGuard
} from "./services/auth.service";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { LoginComponent } from "./component/login-component/login-component.component";
import { AppRoutingModule } from "./app-routing.module";
import { ConstService } from "./services/const.services";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { ValidationService } from "./services/validation.service";
import { FooterComponent } from "./component/main-parent/footer/footer.component";
import { HomeComponent } from "./component/main-parent/home/home.component";
import { HeaderComponent } from "./component/main-parent/header/header.component";
import { MainParentComponent } from "./component/main-parent/main-parent.component";
import { ScrollbarModule } from "ngx-scrollbar";
import { PolicyComponent } from "./component/policy/policy.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { DashboardHeaderComponent } from "./component/dashboard-header/dashboard-header.component";
import { CryptoWalletComponent } from "./component/crypto-wallet/crypto-wallet.component";
import {
  TransferFundComponent
} from "./component/transfer-fund/transfer-fund.component";
import { ModalModule } from "ngx-bootstrap";
import { OtpComponent } from "./component/otp/otp.component";
import { LoadingComponent } from "./component/loading/loading.component";
import { TransferService } from "./services/transfer.service";
import { TransactionReceiptComponent } from "./component/transaction-receipt/transaction-receipt.component";
import {
  OldSummaryComponent,
  DetailsComponent
} from "./component/old-summary/old-summary.component";
import { RegisterComponent } from "./component/register/register.component";
import { NewLoadingComponent } from "./component/new-loading/new-loading.component";
import { StockCalculatorComponent } from './component/stock-calculator/stock-calculator.component';
import { StockManagerComponent } from './component/stock-manager/stock-manager.component';
import { StockSummaryComponent } from './component/stock-summary/stock-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    MainParentComponent,
    PolicyComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    CryptoWalletComponent,
    TransferFundComponent,
      OtpComponent,
    LoadingComponent,
    TransactionReceiptComponent,
    OldSummaryComponent,
    RegisterComponent,
    NewLoadingComponent,
    DetailsComponent,
    StockCalculatorComponent,
    StockManagerComponent,
    StockSummaryComponent,

  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollbarModule,
    ModalModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    AuthGuard,
    After_AuthGuard,
    TransferService,
    AuthService,
    ConstService,
    ValidationService,
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [DetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
