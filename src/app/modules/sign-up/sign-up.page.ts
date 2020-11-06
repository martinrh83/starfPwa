import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './../../core/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private router:Router,
    private _auth: AuthService,
    private _toastService: ToastService
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
      this._auth.signUp(data).subscribe((res)=>{
        console.log(res)
        if(res.status == "success"){
          this._toastService.basicToast('Se ha creado su usuario correctamente', 'success').then(()=>{
            this.router.navigate(['/login']);
          });
        }
      });
    }
  }
}
