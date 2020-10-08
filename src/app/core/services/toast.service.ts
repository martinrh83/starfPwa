import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: any;
  constructor(private toastCtrl: ToastController) { }

  async basicToast(message){
    this.toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: "top"
    })
    this.toast.present();
  };


  async errorToast(message){
    this.toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: "top",
      color: "danger"
    })
    this.toast.present();
  };
  
}
