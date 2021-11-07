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

  signIn(email: string, password: string) {
    this.restService.validateUser(email, password).subscribe(async (validationResult: any) => {
      if(validationResult.data.accountType == "patient"){
        alert("Sorry, you are unable to use this system. Please use the mobile app");
        return;
      }
      if(validationResult.data.result){
        console.log("CRUD: Validated");
        const response = await this.restService.getUser(validationResult.data.userId).toPromise();
        this.user = new User(response.data);
        this.loggedIn.next(true);
        this.router.navigate(['']);

      }else{
        console.log("CRUD: NOT validated");
        //Todo Alert Service notify user wrong password
        alert("You have entered a wrong Email/Password, please try again.");

      }
    });

  }

  signOut() {
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean>  {
    return this.loggedIn;
  }

  getAccountType() {
    return this.user.accountType;
  }
  getName() {
    return this.user.firstName + " " + this.user.surname;
  }
}
