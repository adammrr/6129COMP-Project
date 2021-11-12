import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './User.model';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  // Node/Express API
  REST_API: string = 'http://localhost:3000';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  // Get all Patients
  GetPatients() {
    return this.httpClient.get(`${this.REST_API}/patients`);
  }

  // Get all Patients
  GetPractitioners() {
    return this.httpClient.get(`${this.REST_API}/practitioners`);
  }

  getPractices(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/practices`);
  }
  // Delete
  deletePractice(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-practice/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
  // Validate User
  validateUser(email: string, password: string, rememberMe: boolean) {
    console.log("CRUD: Attempting to validate '" + email + "' with password '" + password + "'.");
    console.log("CRUD: Remember me Value: " + rememberMe.valueOf());
    return this.httpClient.post(`${this.REST_API}/validate-user`, {email: email, password: password, rememberMe: rememberMe});
  }

  //Validate Cookie
  validateCookie(cookie: string) : Observable<any> {
    return this.httpClient.post(`${this.REST_API}/validate-cookie`, {cookie: cookie});
  }

  // Get single object
  getUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {error: 'ERROR'}
        }),
        catchError(this.handleError)
      )
  }

  // Delete User Account
  deleteUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
  //////////////Examples below////////////////////////

  // Add
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }




  // Update
  updateUser(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
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
