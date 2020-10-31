import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private router:Router,
    private _auth: AuthService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
  }

  signUp(form: NgForm) {
    let data = {};
    if (form.valid) {
      data['name'] = form.controls['name'].value;
      data['last_name'] = form.controls['last_name'].value;
      data['legajo'] = form.controls['legajo'].value;
      data['email'] = form.controls['email'].value;
      data['password'] = form.controls['password'].value;
      data['passwordConfirm'] = form.controls['passwordConfirm'].value;
      console.log(data);
      this._auth.signUp(data).subscribe((res)=>{
        this.router.navigate(['/login']);
      });
    }
  }
}
