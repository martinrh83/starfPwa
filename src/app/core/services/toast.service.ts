import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: any;
  constructor(private toastCtrl: ToastController) { }

  async basicToast(message, color){
    this.toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: "bottom",
      color: color
    })
    this.toast.present();
  };


  async errorToast(message){
    this.toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: "bottom",
      color: "danger"
    })
    this.toast.present();
  };
  
}
