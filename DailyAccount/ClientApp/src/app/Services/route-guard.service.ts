import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate, CanActivateChild{

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.accountService.loggedIn) {
      return true;
    } else {
      this.router.navigateByUrl("/account/login");
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.accountService.loggedIn) {
      return true;
    } else {
      this.router.navigateByUrl("/account/login");
      return false;
    }
  }
}
