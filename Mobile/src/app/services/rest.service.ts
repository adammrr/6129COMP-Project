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

    /** GET */

    public getUserById(id: any): Observable<any> {
        const API_URL = `${this.REST_API}/read-user/${id}`;
        return this.httpClient.get(API_URL, { headers: this.httpHeaders })
            .pipe(map((res: any) => res || { error: 'ERROR' }),
                catchError(this.handleError)
            );
    }

    public getEpilepsyInformation(id: any): Observable<any> {
        const API_URL = `${this.REST_API}/epilepsy-information/${id}`;
        return this.httpClient.get(API_URL, { headers: this.httpHeaders })
            .pipe(map((res: any) => res || { error: 'ERROR' }),
                catchError(this.handleError)
            );
    }

    // Get a list of all films
    public getFilms() {
        return this.httpClient.get(`${this.REST_API}/films`);
    }

    public getTriggers() {
        return this.httpClient.get(`${this.REST_API}/triggers`);
    }

    public getRequests() {
      return this.httpClient.get(`${this.REST_API}/requests`);
    }

    public getRequestsById(id: any): Observable<any> {
      const API_URL = `${this.REST_API}/requests/${id}`;
      return this.httpClient.get(API_URL, { headers: this.httpHeaders })
          .pipe(map((res: any) => res || { error: 'ERROR' }),
              catchError(this.handleError)
          );
    }

    /** GET Ends */

    /** POST */

    public newFilmRequest(id: number,filmDetails: {filmName: string, filmDesc: string, genre: string, runtime:string}){
        console.log(id);
        console.log(filmDetails);
        const API_URL = `${this.REST_API}`;
        return this.httpClient.post(`${this.REST_API}/create-film-request`, {headers: this.httpHeaders, id, filmDetails }).pipe(map((res: any) => res || { error: 'ERROR' }),
        catchError(this.handleError));
    }

    public newTriggerRequest(id: number,triggerDetails: {film: string, timestamp: string, details: string}){
        console.log(id);
        console.log(triggerDetails);
        const API_URL = `${this.REST_API}`;
        return this.httpClient.post(`${this.REST_API}/create-trigger-request`, {headers: this.httpHeaders, id, triggerDetails }).pipe(map((res: any) => res || { error: 'ERROR' }),
        catchError(this.handleError));
    }

    public newSeizure(id: number,seizureDetails:{trigger: number,severity:number,details: string}){
        console.log(id);
        console.log(seizureDetails);
        const API_URL = `${this.REST_API}`;
        return this.httpClient.post(`${this.REST_API}/log-seizure`, {headers: this.httpHeaders, id, seizureDetails }).pipe(map((res: any) => res || { error: 'ERROR' }),
        catchError(this.handleError));
    }

    public register(registrationDetails: { firstName: string; surname: string; gender: string; dob: string; address1: string; address2: string; address3: string; email: string; password: string }) {
        return this.httpClient.post(`${this.REST_API}/register-user`, { registrationDetails });
    }

    public insertEpilepsyInformation(id: number, epilepsyDetails: { seizureType: string; triggerDetails: string; yearsSuffering: number; frequency: string }): Observable<any> {
        const API_URL = `${this.REST_API}/insert-epilepsy-information`;
        return this.httpClient.post(API_URL, { headers: this.httpHeaders, epilepsyDetails, id })
            .pipe(map((res: any) => res || { error: 'ERROR' }),
                catchError(this.handleError)
            );
    }

    // Validate User
    public validateUser(email: string, password: string) {
        console.log('CRUD: Attempting to validate \'' + email + '\' with password \'' + password + '\'.');
        return this.httpClient.post(`${this.REST_API}/validate-user-mobile`, { email, password });
    }

    /** POST Ends */

    /** PUT */

    public updateUser(id: number, updateDetails: { gender: string; address1: string; address2: string; address3: string; email: string; password: string }): Observable<any> {
        const API_URL = `${this.REST_API}/update-user/${id}`;
        return this.httpClient.put(API_URL, { headers: this.httpHeaders, updateDetails })
            .pipe(map((res: any) => res || { error: 'ERROR' }),
                catchError(this.handleError)
            );
    }

    public updateEpilepsyInformation(id: number, epilepsyDetails: { seizureType: string; frequency: string; yearsSuffering: number; triggerDetails: string }): Observable<any> {
        const API_URL = `${this.REST_API}/update-epilepsy-information/${id}`;
        return this.httpClient.put(API_URL, { headers: this.httpHeaders, epilepsyDetails })
            .pipe(map((res: any) => res || { error: 'ERROR' }),
                catchError(this.handleError)
            );
    }

    /** PUT Ends */

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
