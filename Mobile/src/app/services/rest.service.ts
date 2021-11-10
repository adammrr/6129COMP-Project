/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // Node/Express API
  // eslint-disable-next-line @typescript-eslint/naming-convention
  REST_API = 'http://localhost:3000';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  // Get all Patients
  getPatients() {
    return this.httpClient.get(`${this.REST_API}/patients`);
  }

  public register(registrationDetails: { firstName: string; surname: string; gender: string; dob: string; address1: string; address2: string; address3: string; email: string; password: string }) {
    return this.httpClient.post(`${this.REST_API}/register-user`, {registrationDetails});
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
