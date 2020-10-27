import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './component/login-component/login-component.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard, After_AuthGuard } from './services/auth.service';
import { FooterComponent } from './component/main-parent/footer/footer.component';
import { HeaderComponent } from './component/main-parent/header/header.component';
import { MainParentComponent } from './component/main-parent/main-parent.component';
import {HomeComponent } from './component/main-parent/home/home.component';
import {PolicyComponent} from './component/policy/policy.component';
import {CryptoWalletComponent} from './component/crypto-wallet/crypto-wallet.component';
import {TransferFundComponent} from './component/transfer-fund/transfer-fund.component';
import {OtpComponent} from './component/otp/otp.component';
import {LoadingComponent} from './component/loading/loading.component';
import { TransactionReceiptComponent } from './component/transaction-receipt/transaction-receipt.component';
import {OldSummaryComponent} from './component/old-summary/old-summary.component';
import { RegisterComponent } from './component/register/register.component';
import { NewLoadingComponent } from './component/new-loading/new-loading.component';
import { StockCalculatorComponent } from './component/stock-calculator/stock-calculator.component';
import { StockManagerComponent } from './component/stock-manager/stock-manager.component';
import {StockSummaryComponent} from './component/stock-summary/stock-summary.component';
import { CustomersComponent } from './component/customers/customers.component';
import { BillsComponent } from './component/bills/bills.component';
import { InvoiceComponent } from './component/invoice/invoice.component';







const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [After_AuthGuard] },
    { path: 'newloading', component: NewLoadingComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register/:email', component: RegisterComponent },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent},
    {path: 'policy', component: PolicyComponent, canActivate: [AuthGuard]},
    {path: 'summary', component: OldSummaryComponent, canActivate: [AuthGuard]},
    {path: 'crypto-wallet', component: CryptoWalletComponent, canActivate: [AuthGuard]},
    {path: 'fund', component: TransferFundComponent, canActivate: [AuthGuard]},
    {path: 'otp', component: OtpComponent, canActivate: [AuthGuard]},
    {path: 'wait', component: LoadingComponent, canActivate: [AuthGuard]},
    {path: 'detail', component: TransactionReceiptComponent, canActivate: [AuthGuard]},
    { path: 'calculator', component: StockCalculatorComponent},
    { path: 'stock', component: StockManagerComponent},
    { path: 'stock-summary', component: StockSummaryComponent},
    {path: 'bills', component: BillsComponent },
    { path: 'customers', component: CustomersComponent},
    { path: 'invoice', component: InvoiceComponent},
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
