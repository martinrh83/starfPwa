import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  errorLogin = new Subject<boolean>();
  //Modificar los archivos environmnent para poder modificar ambientes de manera dinamica
  // port = environment.port;

  constructor(private httpClient: HttpClient) {
  }

  public get(path: string, isText: boolean = false): Observable<any> {
    if (isText) {
      return this.httpClient.get(this.getBaseURL() + path, { responseType: 'text' }).pipe(catchError(this.formatErrors));
    }
    return this.httpClient.get(this.getBaseURL() + path).pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}, isText = null): Observable<any> {
    if (isText != null) {
      return this.httpClient.put(this.getBaseURL() + path, JSON.stringify(body), { responseType: 'text' }).pipe(catchError(this.formatErrors));
    }
    return this.httpClient.put(this.getBaseURL() + path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}, isText = null): Observable<any> {
    if (isText != null) {
      return this.httpClient.post(this.getBaseURL() + path, JSON.stringify(body), { responseType: isText }).pipe(catchError(this.formatErrors));
    }
    return this.httpClient.post(this.getBaseURL() + path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  public delete(path: string, isText: string = null): Observable<any> {
    if (!isText) {
      return this.httpClient.delete(this.getBaseURL() + path).pipe(catchError(this.formatErrors)).pipe(catchError(this.formatErrors));
    }
    return this.httpClient.delete(this.getBaseURL() + path, { responseType: 'text' }).pipe(catchError(this.formatErrors));

  }

  public formatErrors(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 && error.error.message == 'Authentication failed'){
      try {
        this.errorLogin.next(true);
      } catch(error){
      }
    }
    return throwError(error.error);
  }

  getBaseURL() {
    let hostname = "https://starf-server.herokuapp.com"
    let apiPath = "/api/v1/";
    let url = `${hostname}${apiPath}`;
    return url;
  }
  showCredError(){
    this.errorLogin.next(true);
  }
  hideCredError(){
    this.errorLogin.next(false);
  }
}
