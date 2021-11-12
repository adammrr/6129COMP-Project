import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private signedIn = false;

  constructor(private authService: AuthService, public router: Router) {
    this.authService.isLoggedIn().subscribe((value: boolean) => { this.signedIn = value;});
  };



  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log("CanActivate");


    if (!this.signedIn){
        this.authService.checkCookie();
        if(!this.signedIn){
          console.log("No cookie sign in ");
          this.router.navigate(['login']);
          return false;
        }else{
          console.log("AuthGuard: signed in via cookies canActivate true")
          return true;
        }

    }else{
      console.log("AuthGuard: canActivate true")
      return true;
    }

  }

  validateCookie(cookie: string) {

  }
}
