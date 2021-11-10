/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    public getPatients() {
        return this.httpClient.get(`${this.REST_API}/patients`);
    }

    public getUser(id: any): Observable<any> {
        const API_URL = `${this.REST_API}/read-user/${id}`;
        return this.httpClient.get(API_URL, { headers: this.httpHeaders })
            .pipe(map((res: any) => res || { error: 'ERROR' }),
                catchError(this.handleError)
            );
    }

    public register(registrationDetails: { firstName: string; surname: string; gender: string; dob: string; address1: string; address2: string; address3: string; email: string; password: string }) {
        return this.httpClient.post(`${this.REST_API}/register-user`, { registrationDetails });
    }

    // Validate User
    public validateUser(email: string, password: string) {
        console.log('CRUD: Attempting to validate \'' + email + '\' with password \'' + password + '\'.');
        return this.httpClient.post(`${this.REST_API}/validate-user`, { email, password });
    }

    // Error
    public handleError(error: HttpErrorResponse): Observable<string> {
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