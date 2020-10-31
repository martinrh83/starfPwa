import { Component } from '@angular/core';
import { AuthService } from './../../core/services/user/auth.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private _authService: AuthService, private afMessaging: AngularFireMessaging) {
    /*console.log('asdasd')
    this._authService.getUsers().subscribe(res =>{
      console.log(res)
    })*/
    
  }
}
