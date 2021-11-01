import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject(false);
  accountType: number = 0;

  constructor() { }

  signIn(accountType: number) {
    this.accountType = accountType;
    this.loggedIn.next(true);
    console.log("SIGNED IN AUTH SERVICE");
  }

  signOut() {
    this.loggedIn.next(false);
  }

  isLoggedIn():Observable<boolean>  {
    return this.loggedIn;
  }

  getAccountType() {
    return this.accountType;
  }
}
