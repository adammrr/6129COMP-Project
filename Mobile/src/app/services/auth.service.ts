/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private restService: RestService
  ) { }

  public registerUser(registrationDetails: { firstName: string; surname: string; gender: string; dob: string; address1: string; address2: string; address3: string; email: string; password: string }): void {
   this.restService.register(registrationDetails).subscribe(async (validationResult: any) => {
   });
}
}
