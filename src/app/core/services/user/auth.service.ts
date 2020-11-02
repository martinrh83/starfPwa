import { Injectable } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  editData:BehaviorSubject<any>;
  dataChanged:BehaviorSubject<any>;

  constructor(private http: HttpService, private router: Router) { 
    this.editData = new BehaviorSubject({});
    this.dataChanged = new BehaviorSubject({});
  }

  login = (email:string,password: string) => this.http.post('users/login',{email, password});
  signUp = (data: Object) => this.http.post('users/signup', data);
  getUsers = () => this.http.get('users');
  resetPassword(email){
    return this.http.post('auth/reset-password',{email: email}, 'F');
  }
  getAttendances = () => this.http.get('users/get_attendances');
  getDailyNotifications = () => this.http.get('notifications/daily_notifications');
  updatePassword = (data) => this.http.patch('users/update_password', data);
  registerTokenFCM = (tokenFCM) => this.http.post('users/register_token', {token: tokenFCM}); 
  logout(){
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('userData'));
    return  user  !==  null;
  }

}
