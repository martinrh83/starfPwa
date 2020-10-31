import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './../../core/services/toast.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private router:Router,
    private _auth: AuthService,
    private _toastService: ToastService) { }

  ngOnInit() {}

  updatePass(form: NgForm) {
    let data = {};
    if (form.valid) {
      data['passwordCurrent'] = form.controls['oldPassword'].value;
      data['password'] = form.controls['newPassword'].value;
      data['passwordConfirm'] = form.controls['passwordConfirm'].value;
      console.log(data);
      this._auth.updatePassword(data).subscribe((res)=>{
        this._toastService.basicToast('Se ha actualizado su contraseña correctamente', 'success').then(()=>{
          this.router.navigate(['/login']);
        })
        
      });
    }
  }
}
