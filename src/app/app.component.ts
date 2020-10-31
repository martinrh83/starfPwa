import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MessagingService } from 'src/app/core/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  message;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _messagingService: MessagingService
  ) {
    this.initializeApp();
    this._messagingService.requestPushNotificationsPermission();
    this._messagingService.receiveMessage();
    this.message = this._messagingService.currentMessage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffce00');
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }
}
