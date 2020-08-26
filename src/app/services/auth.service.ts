import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHandler,
  HttpRequest,
  HttpClient
} from "@angular/common/http";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
// tslint:disable-next-line:import-blacklist
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import { ConstService } from "./const.services";
@Injectable()
export class AuthService {
  authStorage = new AuthStorage();
  user: any;
  constructor(private http: HttpClient, private constService: ConstService) {}
  isAuthorized() {
    const authData = this.authStorage.getAuthData();
    if (authData) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.authStorage.setAuthorizationHeader(null);
  }
  setAuthorizationHeader(authResponse) {
    this.authStorage.setAuthorizationHeader(authResponse);
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // logged in so return true
    if (this.authService.isAuthorized()) {
      return true;
    }
      this.router.navigate(["login"]);
      return false;
    
    // not logged in so redirect to login page with the return url

  }
}
@Injectable()
export class After_AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // logged in so return true
    if (!this.authService.isAuthorized()) {
      this.router.navigate(["login"]);
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(["dashboard"]);
    return false;
  }
}
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authStorage = new AuthStorage();
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    SiteJS.showLoader();
    const authHeader = this.authStorage.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authHeader)
    });
    // Pass on the cloned request instead of the original request.
    return next
      .handle(authReq)
      .do(event => {
        /* If something needs to be handled when response returned */
      })
      .catch(e => {
        if (e.status === 401 || e.status === 403) {
          window.sessionStorage.clear();
          // window.location.href = '/login';
          // this.authStorage.setAuthorizationHeader(null);
          this.router.navigate(["/login"]);
        }
        return Observable.throw(new Error(`${e.status} ${e.statusText}`));
      })
      .finally(() => {
        /* Loader will be hidden here*/ SiteJS.hideLoader();
      });
  }
}
export class AuthStorage {
  getAuthData() {
    const authData = window.sessionStorage.getItem("auth_data");
    if (authData && authData.length > 0) {
      return JSON.parse(authData);
    }
    return null;
  }
  getAuthorizationHeader() {
    const authData = this.getAuthData();
    if (authData) {
      return authData.token;
    }
  }
  setAuthorizationHeader(authResponse) {
    if (authResponse) {
      window.sessionStorage.setItem("auth_data", JSON.stringify(authResponse));
    }
  }
}
