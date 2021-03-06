/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user!: User;

  constructor(
    private restService: RestService,
    private alert: AlertService
  ) { }

  public registerUser(registrationDetails: { firstName: string; surname: string; gender: string; dob: string; address1: string; address2: string; address3: string; email: string; password: string }): void {
    this.restService.register(registrationDetails).subscribe(async (validationResult: any) => {
    });
  }

  // Checks if a user is an admin or practitioner and denies them entry into the app
  public signIn(email: string, password: string): void {
    this.restService.validateUser(email, password).subscribe(async (validationResult: any) => {
      if (validationResult.data.accountType === 'administrator' || validationResult.data.accountType === 'practitioner') {
        this.alert.presentToast('This account belongs to an admin or practitioner please sign into the web portal');
        return;
      }
      if (!validationResult.data.result) {
        this.alert.presentToast('Incorrect username or password, please try again');
      } else {
        const response = await this.restService.getUserById(validationResult.data.userId).toPromise();
        this.user = new User(response.data);
        this.loggedIn.next(true);
      }
    });
  }

  public signOut(): void {
    this.loggedIn.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }

  public getAccountType(): string {
    return this.user.accountType;
  }

  public getLoggedInUser() {
    return this.user;
  }

  public async updateLoggedInUser(userId: number): Promise<void> {
    const response = await this.restService.getUserById(userId).toPromise();
    this.user = new User(response.data);
  }

  public getLoggedInUserId() {
    return this.user.userId;
  }

  public getName(): string {
    return this.user.firstName + ' ' + this.user.surname;
  }

  public getForename(): string {
    return this.user.firstName;
  }

}
