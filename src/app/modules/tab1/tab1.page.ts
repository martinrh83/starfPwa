import { Component} from '@angular/core';
import { AuthService } from './../../core/services/user/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  notifications = [];

  constructor(private _authService: AuthService) {}

  ionViewWillEnter(){
    this._authService.getDailyNotifications().subscribe(res =>{
      this.notifications = res.data.dailyAttendances;
      this.notifications.forEach(el => {
        let cameraDate = new Date(el.registeredAt);
        let hour  = cameraDate.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
        el.formattedHour = hour;
      });
    });  
  }

  doRefresh(event) {
    console.log('Actualizando...');
    this._authService.getDailyNotifications().subscribe(res =>{
      this.notifications = res.data.dailyAttendances;
      this.notifications.forEach(el => {
        let cameraDate = new Date(el.registeredAt);
        let hour  = cameraDate.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
        el.formattedHour = hour;
      });
      console.log('Finalizó actualización.');
      event.target.complete();
    });
  }
}
