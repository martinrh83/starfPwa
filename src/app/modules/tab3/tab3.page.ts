import { Component } from '@angular/core';
import { AuthService } from './../../core/services/user/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private _authService: AuthService) {}

  logout = () => this._authService.logout();
}
