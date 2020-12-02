import { Injectable } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  editData:BehaviorSubject<any>;
  dataChanged:BehaviorSubject<any>;

  constructor(private http: HttpService, private router: Router, private httpClient: HttpClient) { 
    this.editData = new BehaviorSubject({});
    this.dataChanged = new BehaviorSubject({});
  }

  login = (legajo:number,password: string) => this.http.post('users/login',{legajo, password});
  signUp = (data: Object) => this.http.post('users/signup', data);
  getUsers = () => this.http.get('users');
  resetPassword(email){
    return this.http.post('auth/reset-password',{email: email}, 'F');
  }
  getAttendances = () => this.http.get('users/get_attendances');
  getDailyNotifications = () => this.http.get('notifications/daily_notifications');
  getLastAttendance = (data: Object) => this.http.post('notifications/last_attendance', data);
  updatePassword = (data) => this.http.patch('users/update_password', data);
  registerTokenFCM = (tokenFCM) => this.http.post('users/register_token', {token: tokenFCM}); 
  getHolidays = (year) => {
    return this.httpClient.get(`https://nolaborables.com.ar/api/v2/feriados/${year}`);
  };
  logout(){
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('userData'));
    return  user  !==  null;
  }

}
