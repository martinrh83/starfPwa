import { Component } from '@angular/core';
import { AuthService } from './../../core/services/user/auth.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { LoaderService } from './../../core/services/loader.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  notifications;
  constructor(private _authService: AuthService, private loadingCtrl: LoaderService) {
    this._authService.getDailyNotifications().subscribe(res =>{
      this.loadingCtrl.hideLoader();
      this.notifications = res.data.dailyAttendances;
      this.notifications.forEach(el => {
        let cameraDate = new Date(el.registeredAt);
        let hour  = cameraDate.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
        el.formattedHour = hour;
      });
    })
  }
}
