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
  getPatients() {
    return this.httpClient.get(`${this.REST_API}/patients`);
  }

  // Get all Patients
  getPractitioners() {
    return this.httpClient.get(`${this.REST_API}/practitioners`);
  }

  getPractices(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/practices`);
  }

  // Get single practice
  getPractice(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-practice/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {error: 'ERROR'}
        }),
        catchError(this.handleError)
      )
  }

  // Get patients from a practice
  getPracticePatients(id:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/get-practice-patients`, {practiceId: id});
  }

  // Get single practice
  getRequests(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/get-requests`);
  }

  // Update Practice Details
  updatePractice(data:any): Observable<any> {
    console.log("REST UPDATE");
    console.log(data);
    return this.httpClient.post(`${this.REST_API}/update-practice`, {data: data});
  }
  // add PracticeLink
  addPracticeLink(data:any): Observable<any> {
    console.log(data);
    return this.httpClient.post(`${this.REST_API}/add-practice-link`, {data: data});
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
    return this.httpClient.post(`${this.REST_API}/validate-user`, {email: email, password: password, rememberMe: rememberMe});
  }

  //Validate Cookie
  validateCookie(cookie: string) : Observable<any> {
    return this.httpClient.post(`${this.REST_API}/validate-cookie`, {cookie: cookie});
  }

  // Get single user
  getUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {error: 'ERROR'}
        }),
        catchError(this.handleError)
      )
  }
  // Get user practice links
  getUserPracticeLinks(id:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/user-practices`, {userId: id});
  }
  // Delete User Account
  deleteUserPracticeLink(userId:number, practiceId:number): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/delete-user-practice-link`, {userId: userId, practiceId: practiceId});
  }
  // Delete User Account
  deleteUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
  // Update
  updateUser(data:any): Observable<any> {
    console.log("REST UPDATE");
    console.log(data);
    return this.httpClient.post(`${this.REST_API}/update-user`, {data: data});


  }
  // Create new user
  createUser(data: any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/create-user`, {data: data});
  }
  // Create new practice
  createPractice(data: any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/create-practice`, {data: data});
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
