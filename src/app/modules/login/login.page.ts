import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router:Router,
    private _auth: AuthService,
    private _storage: StorageService
    ) {}

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.valid) {
      let legajo = form.controls['legajo'].value;
      let password = form.controls['password'].value;
      this._auth.login(legajo,password).subscribe((res)=>{
        console.log(res);
        if (res){
          this._storage.setItem('token',res.token);
          this._storage.setItem('userData', JSON.stringify(res.data.user));
          this._auth.registerTokenFCM(this._storage.getItem('tokenFCM')).subscribe(result =>{

            console.log(result)
          })
          this.router.navigate(['tabs']);
        }  
      });
    }
  }
}
