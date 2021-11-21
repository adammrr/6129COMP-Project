import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RestService } from './rest.service';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedInObs: Observable<boolean> = this.loggedIn.asObservable();

  private user!: User;

  constructor(private router: Router, private restService: RestService) { }

  setCookie(name: string, value:string , days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;secure=true";
}
getCookie(name: string):string {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}

  signIn(email: string, password: string, rememberMe: boolean) {
    this.restService.validateUser(email, password, rememberMe).subscribe(async (validationResult: any) => {
      if(validationResult.data.accountType == "patient"){
        alert("Sorry, you are unable to use this system. Please use the mobile app");
        return;
      }
      if(validationResult.data.result){
        const response = await this.restService.getUser(validationResult.data.userId).toPromise();
        this.user = new User(response.data);
        if(rememberMe){
          this.setCookie("cookie", String(validationResult.data.cookie), 1);
        }
        this.loggedIn.next(true);
        this.router.navigate(['']);
      }else{
        //Todo Alert Service notify user wrong password
        alert("You have entered a wrong Email/Password, please try again.");
      }
    });

  }

  signOut() {
    this.loggedIn.next(false);
    this.setCookie("cookie", "", 0);
  }

  isLoggedIn(): Observable<boolean>  {
    if(this.loggedIn.value == false){
      this.checkCookie();
    }
    return this.loggedIn;
  }

  checkCookie() {
    var savedCookie = this.getCookie("cookie");
    this.restService.validateCookie(savedCookie).subscribe(async (validationResult: any) => {
      if(validationResult.data.result == false){
        return;
      }
      const response = await this.restService.getUser(validationResult.data.userId).toPromise();
      this.user = new User(response.data);
      this.loggedIn.next(true);
      this.router.navigate(['']);
    });
  }

  getAccountType() {
    return this.user.accountType;
  }
  getName() {
    return this.user.firstName + " " + this.user.surname;
  }
}
