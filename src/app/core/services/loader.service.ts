import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { concatMap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingRequestsStream$: Subject<boolean>;

  private loaderElement: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {

    this.initValues();

  };

  private initValues() {
    this.loaderElement = null;
    this.loadingRequestsStream$ = new Subject();
    this.loadingRequestsStream$.pipe(
      distinctUntilChanged(),
      concatMap(loader => {
        console.log(loader)
        if (loader) {
          return this.createLoader()
        } else {
          return this.dismissLoader()
        };
      })
    ).subscribe();
  };

  public showLoader() {
    this.loadingRequestsStream$.next(true);
  };

  public hideLoader() {
    this.loadingRequestsStream$.next(false);
  };

  public async createLoader() {
    this.loaderElement = await this.loadingCtrl.create({
      message: "Por favor espere...",
      spinner: "crescent"
    });
    return this.loaderElement.present();
  };

  public dismissLoader() {
    if (this.loaderElement) {
      return this.loaderElement.dismiss();
    };
  };

}
