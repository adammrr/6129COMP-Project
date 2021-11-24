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

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (!this.signedIn){
      this.router.navigate(['']);
      return false;
    }else{
      console.log('AuthGuard: canActivate true');
      return true;
    }
  }
}
